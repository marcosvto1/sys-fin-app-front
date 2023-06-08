import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from '../services/wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss']
})
export class WalletFormComponent {
  form!: FormGroup
  constructor(
    private readonly fb: FormBuilder,
    private readonly walletService: WalletService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      name: this.fb.control("", [Validators.required]),
      amount: this.fb.control("", [Validators.required])
    })
  }

  showFieldError(fieldName: string) {
    const field = this.form.get(fieldName);
    return field?.invalid && (field.touched || field.dirty);
  }

  onSubmit() {
    this.walletService.create(this.form.getRawValue()).subscribe({
      next: (result) => {
        toastr.success('Wallet created with success');
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        toastr.error('faild to create wallet');
      },
    })
  }
}
