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

  $("form#all-pizzas").submit(function(event) {
    event.preventDefault();
    $(".new-pizza").each(function() {
      var pizzaSizeInput = $(this).find("#pizzaSize").val();
      var pizzaBaseInput = $(this).find("#pizzaBase").val();
      var newPizza = new Pizza(pizzaSizeInput, pizzaBaseInput);
      $("#finalPizzaDisplay").append(
        '<li>One ' + pizzaSizeInput + '" ' + pizzaBaseInput + ' Pizza with ');
      $(this).find("input:checkbox[name=toppings-availible]:checked").each(function(){
        var pizzaToppingsInput = $(this).val();
        newPizza.addTopping(pizzaToppingsInput);
        $("#finalPizzaDisplay").append(pizzaToppingsInput + ", ");
      });
      $("#finalPizzaDisplay").append(
        '</li>');
    });
    $("#all-pizzas").toggleClass("hidden");
    $("#finalPizzaDiv").toggleClass("hidden");
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

  $("#add-breadsticks").click(function() {
    $("#finalPizzaDisplay").append("<li>One Order of Breadsticks,</li>");
  });

  $("#add-soda").click(function() {
    $("#finalPizzaDisplay").append("<li>One liter of soda,</li>");
  });

  $("#add-pizzas").click(function() {
    $("#addedPizzas").append(
      '<hr>' +
      '<h2>Next Pizza:</h2>' +
      '<div class="new-pizza">' +
        '<label for="pizzaSize">Select the size of your pizza:</label>' +
        '<select class="form-control" id="pizzaSize">' +
          '<option value="8">Personal (8")</option>' +
          '<option value="10">Small (10")</option>' +
          '<option value="12">Medium (12")</option>' +
          '<option value="14">Large (14")</option>' +
          '<option value="16">XtraLarge (16")</option>' +
          '<option value="18">New York (18")</option>' +
        '</select>' +
        '<label for="pizzaBase">Select a base for your pizza:</label>' +
        '<select class="form-control" id="pizzaBase">' +
          '<option value="Tomato">Tomato</option>' +
          '<option value="Pesto">Pesto</option>' +
        '</select>' +
        '<div class="form-group">' +
          '<div class="row">' +
            '<p><b>Please select which toppings you would like added to your pizza:</b></p>' +
            '<div class="col-xs-5">' +
              '<input type="checkbox" name="toppings-availible" value="Cheese">Cheesee ($0.50)<br>' +
              '<input type="checkbox" name="toppings-availible" value="Double Cheese">Double Cheese  ($0.50)<br>' +
              '<input type="checkbox" name="toppings-availible" value="Triple Cheese">Triple Cheese  ($0.50)<br>' +
              '<input type="checkbox" name="toppings-availible" value="Pepperoni">Pepperoni  ($0.50)<br>' +
            '</div>' +
            '<div class="col-xs-5">' +
              '<input type="checkbox" name="toppings-availible" value="Sausage">Sausage  ($0.50)<br>' +
              '<input type="checkbox" name="toppings-availible" value="Bacon">Bacon  ($0.50)<br>' +
              '<input type="checkbox" name="toppings-availible" value="Mushrooms">Mushroom ($0.50)<br>' +
              '<input type="checkbox" name="toppings-availible" value="Onion">Onion  ($0.50)<br>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'  );
  });




















});
