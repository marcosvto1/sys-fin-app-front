import { Component } from '@angular/core';
import * as toastr from 'toastr';

import { IWallet } from '../wallet.interface';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.scss'],
})
export class WalletListComponent {
  wallets: IWallet[] = [];

  constructor(private readonly walletService: WalletService) {}

  ngOnInit() {
    this.findWallets();
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
}
