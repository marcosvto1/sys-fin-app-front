import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'admin',
    children: [
      {
        path: 'transactions',
        loadChildren: () =>
          import('./modules/transaction/transaction.module').then(
            (m) => m.TransactionModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./modules/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'wallets',
        loadChildren: () =>
          import('./modules/wallet/wallet.module').then((m) => m.WalletModule),
      },
    ],
    canActivate: [AuthGuard,],
  },
  {
    path: 'pages',
    loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule)
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/pages/no-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
