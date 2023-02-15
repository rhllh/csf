// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type 

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { OrderSummary, PizzaOrder } from "./models";

@Injectable()
export class PizzaService {

  constructor(private http: HttpClient) { }

  // POST /api/order
  // Add any required parameters or return type
  createOrder(pizzaOrder: PizzaOrder): Promise<any> { 

    return lastValueFrom(this.http.post('http://localhost:8080/api/order', pizzaOrder))
  }

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  getOrders(email: string): Promise<any> { 
    const headers = new HttpHeaders().set("content-type", "application/json")

    return lastValueFrom(this.http.get<any>(`http://localhost:8080/api/order/${email}/all`, {headers}))
  }

}
