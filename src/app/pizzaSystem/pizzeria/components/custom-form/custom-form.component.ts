import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PizzeriaService } from 'src/app/pizzaSystem/service/pizzeria.service';
import { ToastrService } from 'ngx-toastr';
import { IFormData, PizzaFormData } from 'src/app/shared/models/PizzaOrder';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})

export class CustomFormComponent implements OnInit {

  public ingredientsData: any;
  public totalPrice: number;
  public isToppingPresent: boolean;

  @Output() placeOrderDetails = new EventEmitter<any>();

  public formData: IFormData;

  constructor(private service: PizzeriaService,
    private toastr: ToastrService) {
    this.totalPrice = 0;
    this.isToppingPresent = false;
    this.formData = new PizzaFormData();
  }

  ngOnInit(): void {
    this.getIngredients();
  }

  getIngredients() {
    this.service.getIngredientsList().subscribe(result => {
      this.ingredientsData = result;
    })
  }

  setSauce(event: any) {
    this.formData.SelectedSauce = event;
    this.calculatePrice();
  }

  calculatePrice() {
    this.totalPrice = 0;
    this.formData.Toppings = "";
    setTimeout(() => {
      if (this.formData.Cheese) {
        this.totalPrice += this.ingredientsData[this.formData.Cheese];
      }

      if (this.formData.SelectedSauce) {
        var price = 0;
        this.ingredientsData.Sauce.forEach((element: any) => {
          if (element.Name === this.formData.SelectedSauce) {
            price = element.Price;
          }
        });
        this.totalPrice += price;
      }

      if (this.formData.CrustSize) {
        var price = 0;
        this.ingredientsData.CrustSize.forEach((element: any) => {
          if (element.Size === this.formData.CrustSize) {
            price = element.Price;
          }
        });

        this.totalPrice += price;
      }

      this.ingredientsData.Toppings.forEach((element: any) => {
        if (element.IsSelected) {
          this.totalPrice += this.ingredientsData.ToppingsPrice;
          this.isToppingPresent = true;
          this.formData.Toppings += element.Name + ",";
        }
      });
      if (this.formData.Toppings.length) {
        this.formData.Toppings = this.formData.Toppings.substring(0, this.formData.Toppings.length - 1);
      }
    }, 500);

  }

  onFormSubmit() {
    if (!this.formData.CrustSize) {
      this.toastr.warning("Please select crust size", "Warning");
      return;
    }

    if (!this.formData.SelectedSauce) {
      this.toastr.warning("Please select sauce", "Warning");
      return;
    }

    if (!this.isToppingPresent) {
      this.toastr.warning("Please select atleast one topping", "Warning");
      return;
    }
    this.formData.Price = this.totalPrice;

    this.placeOrderDetails.emit(this.formData);
  }
}
