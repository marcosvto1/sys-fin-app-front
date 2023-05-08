import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IResponseAPI } from "src/app/shared/utils/response.interface";
import { ICategory } from "../category.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private readonly http: HttpClient) {}

  getAll() {
    return this.http.get<ICategory[]>(`${environment.url}/api/v1/categories`)
  }
}
