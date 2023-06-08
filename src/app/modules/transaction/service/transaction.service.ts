import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IResponseAPI } from "src/app/shared/utils/response.interface";
import { IFindTransactionOptions, ITransaction } from "../transaction.interface";
import { environment } from './../../../../environments/environment';
import { map } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private readonly http: HttpClient) {}

  getAll(query: IFindTransactionOptions) {
    const queryString = new URLSearchParams({
      "page_number": String(query.pageNumber),
      "page_size": String(query.pageSize),
      "category_id": String(query.categoryId),
      "wallet_id": String(query.walletId),
      "month": query.month,
      "year": query.year
    })
    return this.http.get<IResponseAPI<ITransaction>>(`${environment.url}/api/v1/transactions?${queryString.toString()}`)
  }

  getOne(transactionId: number) {
    return this.http.get<IResponseAPI<ITransaction>>(`${environment.url}/api/v1/transactions/${transactionId}`)
    .pipe(map((data) => data.items[0]))
  }

  create(data: ITransaction) {
    return this.http.post<ITransaction>(`${environment.url}/api/v1/transactions`, data)
  }

  update(transactionId: number, data: ITransaction) {
    return this.http.put<ITransaction>(`${environment.url}/api/v1/transactions/${transactionId}`, data)
  }

  delete(transactionId: string) {
    return this.http.delete(`${environment.url}/api/v1/transactions/${transactionId}`)
  }
}
