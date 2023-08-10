import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr';
import { TransactionService } from '../service/transaction.service';
import { IWallet } from '../../wallet/wallet.interface';
import { WalletService } from '../../wallet/services/wallet.service';
import { IFindTransactionOptions, ITransaction } from '../transaction.interface';
import { CategoryService } from '../../category/services/category.service';
import { ICategory } from '../../category/category.interface';



@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
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
  month = {
    id: "00",
    value: 'JANEIRO',
  };
  years = [
    "2023",
    "2024"
  ]
  year: string = new Date().getFullYear().toString()
  transactions: ITransaction[] = [];
  categories: ICategory[] = [];
  category: string = "-1"
  wallets: IWallet[] = []
  wallet: string = "-1"

  balanceTotalInput = 0;
  balanceUnpaidInput = 0
  balancePaidInput = 0;

  balanceTotalOutput = 0;
  balanceUnpaidOutput = 0;
  balancePaidOutput = 0;

  constructor(private readonly transactionService: TransactionService,
    private readonly walletsServices: WalletService,
    private readonly categoriesService: CategoryService) {}

  ngOnInit() {
    const currentDay = new Date();
    const m = currentDay.getMonth() - 1;
    this.setMonth(String(m).padStart(2, "0"));
    this.findWallets();
    this.findCategories();
    this.findTransactions();
  }

  onChangeMonth(value: any) {
    const m = value.target.value;
    this.setMonth(m);
    this.findTransactions()
  }

  onChangeYear() {
    this.findTransactions()
  }

  onChangeWallet() {
    this.findTransactions()
  }

  onChangeCategory() {
    this.findTransactions()
  }

  setMonth(m: string) {
    const mFounded = this.months.find((i) => i.id === m);
    if (mFounded) {
      this.month = mFounded;
    }
  }

  findWallets() {
    this.walletsServices.getAll().subscribe({
      next: (data) => {
        this.wallets = data
      },
      error: (err) => {
        toastr.error('Failed to find wallets')
      }
    })
  }

  findCategories() {
    this.categoriesService.getAll().subscribe({
      next: (data) => {
        this.categories = data
      },
      error: (err) => {
        toastr.error('Failed to find categories')
      }
    })
  }

  findTransactions() {
    const params = {
      pageNumber: 1,
      pageSize: 100,
      categoryId: parseInt(this.category) || -1,
      walletId: parseInt(this.wallet) || -1,
      month: String(this.month.id),
      year: this.year
    } as IFindTransactionOptions


    this.transactionService.getAll(params).subscribe({
      next: (data) => {
        if (data) {
          this.transactions = data.items;
          this.setStats();
        }
      },
      error: (err) => {
        toastr.error('failed find transations. reload page and try again!');
      },
    });
  }

  setStats() {
    this.balanceTotalInput = 0
    this.balanceTotalOutput = 0
    this.balancePaidInput = 0
    this.balancePaidOutput = 0
    this.balanceUnpaidInput = 0
    this.balanceUnpaidOutput = 0

    const stats = this.transactions.reduce(
      (acc, item) => {
        if (item.transaction_type == 'input') {
          acc['blcTotalInput'] += item.amount;
          if (item.paid) {
            acc.blcPaidInput += item.amount;
          } else {
            acc.blcUnpaidInput += item.amount;
          }
        } else {
          acc['blcTotalOutput'] += item.amount;
          if (item.paid) {
            acc.blcPaidOutput += item.amount;
          } else {
            acc.blcUnpaidOuput += item.amount;
          }
        }

        return acc;
      },
      {
        blcTotalInput: 0,
        blcTotalOutput: 0,
        blcPaidInput: 0,
        blcPaidOutput: 0,
        blcUnpaidInput: 0,
        blcUnpaidOuput: 0
      }
    );

    this.balanceTotalInput = stats.blcTotalInput
    this.balanceTotalOutput = stats.blcTotalOutput
    this.balancePaidInput = stats.blcPaidInput
    this.balancePaidOutput = stats.blcPaidOutput
    this.balanceUnpaidInput = stats.blcUnpaidInput
    this.balanceUnpaidOutput = stats.blcUnpaidOuput
  }

  handleDeleteTransaction(event: any, id: string) {
    this.transactionService.delete(id).subscribe({
      next: () => {
        toastr.success('transaction removided with success')
        this.findTransactions()
      },
      error: () => {
        toastr.error('failed to remove transaction')
      }
    })
  }
}
