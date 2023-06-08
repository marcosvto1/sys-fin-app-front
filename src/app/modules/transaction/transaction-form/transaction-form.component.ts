import { IWallet } from './../../wallet/wallet.interface';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICategory } from '../../category/category.interface';
import { CategoryService } from '../../category/services/category.service';
import { TransactionService } from '../service/transaction.service';
import * as toastr from 'toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { distinct } from 'rxjs';
import { WalletService } from '../../wallet/services/wallet.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent {
  months = [
    { id: '00', value: 'JANEIRO' },
    { id: '01', value: 'FEVEREIRO' },
    { id: '02', value: 'MAIO' },
    { id: '03', value: 'MARÇO' },
    { id: '04', value: 'ABRIL' },
    { id: '05', value: 'JUNHO' },
    { id: '06', value: 'JULHO' },
    { id: '07', value: 'AGOSTO' },
    { id: '08', value: 'SETEMBRO' },
    { id: '09', value: 'OUTUBRO' },
    { id: '10', value: 'NOVEMBRO' },
    { id: '11', value: 'DEZEMBRO' },
  ];
  form!: FormGroup;
  categories: ICategory[] = [];
  wallets: IWallet[] = [];
  transaction_id!: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private walletService: WalletService,
    private transactionService: TransactionService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.transaction_id = parseInt(this.actRoute.snapshot.params['id']);
    if (this.transaction_id) {
      this.findTransaction();
    }
    this.findCategories();
    this.findWallets();
    this.buildForm();
  }

  showFieldError(fieldName: string) {
    const field = this.form.get(fieldName);
    return field?.invalid && (field.touched || field.dirty);
  }

  buildForm() {
    this.form = this.fb.group({
      description: this.fb.control('', [Validators.required]),
      amount: this.fb.control('', [Validators.required]),
      category_id: this.fb.control('', [Validators.required]),
      transaction_type: this.fb.control('output', [Validators.required]),
      transaction_at: this.fb.control(
        `${new Date().getFullYear()}-${new Date()
          .getMonth()
          .toString()
          .padStart(2, '0')}-01`,
        [Validators.required]
      ),
      wallet_id: this.fb.control('', [Validators.required]),
      paid: this.fb.control(false, [Validators.required]),
      month: this.fb.control(
        new Date().getMonth().toString().padStart(2, '0'),
        [Validators.required]
      ),
    });

    this.form
      .get('category_id')
      ?.valueChanges.pipe(distinct())
      .subscribe((value) => this.form.get('category_id')?.setValue(+value));

    this.form
      .get('wallet_id')
      ?.valueChanges.pipe(distinct())
      .subscribe((value) => this.form.get('wallet_id')?.setValue(+value));

    this.form
      .get('month')
      ?.valueChanges.pipe(distinct())
      .subscribe((month) =>
        this.form
          .get('transaction_at')
          ?.setValue(`${new Date().getFullYear()}-${month}-01`)
      );
  }

  findCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {},
    });
  }

  findWallets() {
    this.walletService.getAll().subscribe({
      next: (data) => {
        this.wallets = data;
      },
      error: (err) => {
        toastr.error('Failed to find wallets');
      },
    });
  }

  findTransaction() {
    this.transactionService.getOne(this.transaction_id).subscribe({
      next: (data) => {
        this.form.patchValue(data);

        const dt = new Date(data.transaction_at);

        this.form
          .get('month')
          ?.setValue(
              (dt.getMonth() + 1)
              .toString()
              .padStart(2, '0')
          );
      },
      error: (error) => {
        toastr.error('failed to fetch transaction data');
      },
    });
  }

  onSubmit() {
    const payload = { ...this.form.getRawValue() };
    delete payload.month;

    if (this.transaction_id) {
      this.transactionService
        .update(this.transaction_id, {
          ...this.form.getRawValue(),
        })
        .subscribe({
          next: (result) => {
            toastr.success('Transaction updated with success');
            this.router.navigate(['/transactions']);
          },
          error: (err) => {
            toastr.error('failed to updated transaction');
          },
        });
    } else {
      this.transactionService
        .create({
          ...this.form.getRawValue(),
        })
        .subscribe({
          next: (result) => {
            toastr.success('Transaction created with success');
            this.router.navigate(['/transactions']);
          },
          error: (err) => {
            toastr.error('faild to create transaction');
          },
        });
    }
  }
}
