import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IWallet } from "../wallet.interface";


@Injectable({
  providedIn: 'root'
})
export class WalletService {
  constructor(private readonly http: HttpClient) {}

  getAll() {
    return this.http.get<IWallet[]>(`${environment.url}/api/v1/wallets`)
  }

  create(category: IWallet) {
    return this.http.post<IWallet>(`${environment.url}/api/v1/wallets`, category)
  }
}
