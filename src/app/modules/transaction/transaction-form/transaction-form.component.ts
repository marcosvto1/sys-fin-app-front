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
  form!: FormGroup;
  categories: ICategory[] = [];
  wallets: IWallet[] = []
  transaction_id!: number

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private walletService: WalletService,
    private transactionService: TransactionService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.transaction_id = parseInt(this.actRoute.snapshot.params['id'])
    this.findTransaction()
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
      transaction_at: this.fb.control('', [Validators.required]),
      wallet_id: this.fb.control('', [Validators.required]),
    });

    this.form
      .get('category_id')
      ?.valueChanges.pipe(distinct())
      .subscribe((value) => this.form.get('category_id')?.setValue(+value));

    this.form
      .get('wallet_id')
      ?.valueChanges.pipe(distinct())
      .subscribe((value) => this.form.get('wallet_id')?.setValue(+value));
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
        this.wallets = data
      },
      error: (err) => {
        toastr.error('Failed to find wallets')
      }
    })
  }

  findTransaction() {
    this.transactionService.getOne(this.transaction_id).subscribe({
      next: (data) => {
        console.log(data);
        this.form.patchValue(data)
      },
      error: (error) => {
        toastr.error('failed to fetch transaction data')
      }
    })
  }

  onSubmit() {
    console.log(this.form.getRawValue());
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
