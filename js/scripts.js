// **********************************************************
// Business Logic:
// **********************************************************

function Pizza(size, base) {    //This will be the constructor that establishes the first pizza.
  this.size = size;
  this.base = base;       //Availible bases may include: tomato, pesto
  this.toppings = [];     //An empty array will hold the list of toppings. Availible toppings will include: Cheese, Extra Cheese, Pepperoni, Sausage, Bacon
}

Pizza.prototype.addTopping = function(topping) {    //This function will add toppings to the pizza.
  this.toppings.push(topping);
}

Pizza.prototype.cost = function() {                 //This function will calculate the cost of the pizza.
  var cost = parseFloat(this.size) * 1.5;
  cost += (this.toppings.length) * 0.5;
  return cost;
}

function Customer(fullName, street, city, state, zip) {
  this.fullName = fullName;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

// **********************************************************
// User Interface Logic:
// **********************************************************
$(document).ready(function() {

  $("form#new-pizza").submit(function(event) {
    event.preventDefault();
      //var pizzaSizeInput = $(this).find("#addressType").val();
      var pizzaSizeInput = document.getElementById('pizzaSize').value;
      var pizzaBaseInput = document.getElementById('pizzaBase').value;
      var newPizza = new Pizza(pizzaSizeInput, pizzaBaseInput);
      $("input:checkbox[name=toppings-availible]:checked").each(function(){
        var pizzaToppingsInput = $(this).val();
        newPizza.addTopping(pizzaToppingsInput);
      });
      alert(newPizza.toppings);
      alert(newPizza.cost());
      //$("#work-responses").show();
      //$('#transportation_survey').hide();
  });

  $("form#new-customer").submit(function(event) {
    event.preventDefault();
    var fullNameInput = $("input#new-full-name").val();
    var streetInput = $("input#street-address").val();
    var cityInput = $("input#city-address").val();
    var stateInput = $("input#state-address").val();
    var zipInput = $("input#zip-code").val();
    var newCustomer = new Customer(fullNameInput, streetInput, cityInput, stateInput, zipInput);
    alert(newCustomer.fullName);

  });




});
