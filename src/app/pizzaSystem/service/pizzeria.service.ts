import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzeriaService {

  constructor(private http: HttpClient) { }

  getItemList(){
    var url = "https://localhost:44351/api/PizzaOrder/getpizza";
    return this.http.get(url);
  }

  getIngredientsList(){
    var url = "https://localhost:44351/api/PizzaOrder/getingredients";
    return this.http.get(url);
  }

  placeOrder(data: any){
    var url = "https://localhost:44351/api/PizzaOrder/placeorder";
    return this.http.post(url, data);
  }

}
