export interface IFormData {
  CrustSize: string;
  SelectedSauce: string;
  Cheese: string;
  Toppings: string;
  Price: number;
  IsCustom: boolean;
}

export class PizzaFormData implements IFormData{
  CrustSize: string;
  SelectedSauce: string;
  Cheese: string;
  Toppings: string;
  Price: number;
  IsCustom: boolean;

  constructor() {
    this.CrustSize = "";
    this.SelectedSauce = "";
    this.Cheese = "";
    this.Toppings = "";
    this.Price = 0;
    this.IsCustom = false;
  }

}