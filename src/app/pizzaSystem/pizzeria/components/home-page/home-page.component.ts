import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PizzeriaService } from 'src/app/pizzaSystem/service/pizzeria.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private service: PizzeriaService,
    private toastr: ToastrService) { }

  public pizzaDetails: any;
  public selectedPizza: any;

  ngOnInit(): void {
    this.getItems();

  }

  getItems() {
    this.service.getItemList().subscribe(result => {
      this.pizzaDetails = result;
    })
  }

  imageClicked(data: any) {
    this.selectedPizza = data;
  }

  placeOrder(event?: any) {
    if (!event && !this.selectedPizza) {
      this.toastr.warning("Please select pizza!");
    }

    if(!event && this.selectedPizza){
      event = {
        Name: this.selectedPizza.Name,
        Price: this.selectedPizza.Price,
        IsCustom: false
      }
    }
  

    this.service.placeOrder(event).subscribe(result => {
      this.toastr.success("Order Placed Successfully", "Hurray!!");
    })

  }

}
