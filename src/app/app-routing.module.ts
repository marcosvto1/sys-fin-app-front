import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'transactions',
    loadChildren: () => import('./modules/transaction/transaction.module').then(m => m.TransactionModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'wallets',
    loadChildren: () => import('./modules/wallet/wallet.module').then(m => m.WalletModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
