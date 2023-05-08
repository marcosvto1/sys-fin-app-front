import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../shared/shared.module';
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { WalletFormComponent } from './wallet-form/wallet-form.component';

const routes: Routes = [
  {
    path: '',
    component: WalletListComponent,
  },
  {
    path: 'new',
    component: WalletFormComponent,
  },
  {
    path: ':id/edit',
    component: WalletFormComponent,
  },
];

@NgModule({
  declarations: [WalletListComponent, WalletFormComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class WalletModule {}
