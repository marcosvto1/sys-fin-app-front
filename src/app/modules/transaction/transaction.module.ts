import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const routes: Routes = [
  { path: '', component: TransactionListComponent },
  { path: 'new', component: TransactionFormComponent },
  { path: ':id/edit', component: TransactionFormComponent },
];

@NgModule({
  declarations: [TransactionListComponent, TransactionFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    SweetAlert2Module,
    NgxCurrencyModule,
  ],
})
export class TransactionModule {}
