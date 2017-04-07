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
  var cost = parseFloat(this.size) * 1;
  cost += (this.toppings.length) * 0.5;
  if (this.toppings.includes("Bacon")) {
    cost += 0.5
  }
  return cost;
}

function Customer(fullName, street, city, state, zip) {   //Pretty simple constructor for a customer object to store their data.
  this.fullName = fullName;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

function totalCost(totalCost) {                   //This will construct an object to store the total cost of the order.
  this.totalCost = totalCost;
  this.costArray = [];
}

totalCost.prototype.calculate = function() {    //Not supposed to introduce new variables here, but they are local, and this.totalCost was NOT working as intended, for reasons I intend to revisit.
  var cumulativeCost = 0;
  this.costArray.forEach(function(singleCost) {
    cumulativeCost += singleCost;
  });
  return cumulativeCost;
}

// **********************************************************
// User Interface Logic:
// **********************************************************
$(document).ready(function() {
  var thisCost = new totalCost(0);            //Establishes a variable for calculating the overall cost of the order.
    $("form#all-pizzas").submit(function(event) {
    event.preventDefault();
    $(".new-pizza").each(function() {         //Cycles through all of the form fields for each unique pizza.
      var pizzaSizeInput = $(this).find("#pizzaSize").val();    //These take the values in the input fields.
      var pizzaBaseInput = $(this).find("#pizzaBase").val();
      var newPizza = new Pizza(pizzaSizeInput, pizzaBaseInput);  //Establishes a new variable for the individual pizza.
      $("#finalPizzaDisplay").append(
        '<li>One ' + newPizza.size + '" ' + newPizza.base + ' Pizza with ');
      $(this).find("input:checkbox[name=toppings-availible]:checked").each(function(){    //I am still amazed hours later that I got this command line to work as desired through guessing alone.
        var pizzaToppingsInput = $(this).val();                                           //This will add all of the toppings selected to the array of toppings for each individual pizza.
        newPizza.addTopping(pizzaToppingsInput);
      });
      newPizza.toppings.forEach(function(topping) {         //This loop is here to append the pizza toppings to the final display, NOT the array.
        $("#finalPizzaDisplay").append(topping + ", ");     //It was separated to perform logic via the objects rather than directly appending from pizzaToppingsInput above.
      });
      $("#finalPizzaDisplay").append(
        '$' + newPizza.cost() +                             //Displays the cost of the individual pizza, pretty simple.
        '</li>');
      thisCost.costArray.push(newPizza.cost());             //Pushes the cost of the individual pizza into the array that hadles the cost of all pizzas together.
    });
    $("#all-pizzas").toggleClass("hidden");                 //Removes the pizza order form and displays the final prices.
    $("#finalPizzaDiv").fadeToggle(1000);
    $(".finalcost").text("Your final price is $" + thisCost.calculate());   //Calls the function to display the overall price of all pizzas.
  });

  $("form#new-customer").submit(function(event) {            //Pretty simple function to take in a user's name and address and store in in the back as well as display it back as confirmation.
    event.preventDefault();
    var fullNameInput = $("input#new-full-name").val();
    var streetInput = $("input#street-address").val();
    var cityInput = $("input#city-address").val();
    var stateInput = $("input#state-address").val();
    var zipInput = $("input#zip-code").val();
    var newCustomer = new Customer(fullNameInput, streetInput, cityInput, stateInput, zipInput);
    $("#finalAddressDisplay").append(newCustomer.fullName + "<br>" + newCustomer.street + "<br>" + newCustomer.city + "<br>" + newCustomer.state + "<br>" + newCustomer.zip);


    $("#new-customer").toggleClass("hidden");               //Removes the address forms and displays the confirmation screen.
    $("#finalAddressDiv").fadeToggle(1000);

  });

  $("#add-breadsticks").click(function() {                                      //These next two function just add breadsticks and soda to the overall cost and display them.
    $("#finalPizzaDisplay").append("<li>One Order of Breadsticks, $1.50</li>");
    thisCost.costArray.push(1.5);
    $(".finalcost").text("Your final price is $" + thisCost.calculate());
  });

  $("#add-soda").click(function() {
    $("#finalPizzaDisplay").append("<li>One 750ml Soft Drink, $2.50</li>");
    thisCost.costArray.push(2.50);
    $(".finalcost").text("Your final price is $" + thisCost.calculate());
  });

  $("#add-pizzas").click(function() {                                             //The-wall-of-text™ is identical to the pizza forms already in the HTML, this just adds more of them.
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
              '<input type="checkbox" name="toppings-availible" value="Bacon">Bacon  ($1.00)<br>' +
              '<input type="checkbox" name="toppings-availible" value="Mushrooms">Mushroom ($0.50)<br>' +
              '<input type="checkbox" name="toppings-availible" value="Onion">Onion  ($0.50)<br>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'  );
  });
});
