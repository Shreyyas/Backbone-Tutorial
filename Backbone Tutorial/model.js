
/*************************************************
 *        Instantiating Backbone Models
 *************************************************/
console.log('----------INSTANTIATING BACKBONE MODELS--------');

// There are two ways to instantiate Backbone models:
// 1) Extend the Backbone.Model class
// 2) Instantiate the Backbone.Model class

// 1. Make a class by extending the Backbone Model class
var Vehicle = Backbone.Model.extend({});

// Instantiate the class
var vehicle = new Vehicle(); 

// Create a property for that instance
vehicle.prop1 = 'min';

// 2. Directly create an instance using the Backbone Model class
var vehicle2 = new Backbone.Model();

// Create a property for that instance
vehicle2.prop1 = 'max';

// Display their contents
console.log('VEHICLE 1', vehicle.prop1);
console.log('VEHICLE 2', vehicle2.prop1);




/*************************************************
 *               Model Inheritance
 *************************************************/
console.log('----------BACKBONE MODELS--------');

// We can inherit between models as well!

// Create the A class
var A = Backbone.Model.extend({

	// Constructor --> initialize is a special keyword for a constructor
	// It's run as soon as the instance is made
	initialize: function() {
		console.log("A IS INITIALIZED NOW");
	}, 

	// Prints out a string representation of this object's attribtutes
	toString: function() {
		return JSON.stringify(this.toJSON());
	}
});

// Instantiate A class
var a = new A({
	one: '1', 
	two: '2'
});

// Create the B class by extending A
var B = A.extend({
	initialize: function() {
		console.log("B IS INITIALIZED NOW");
	}
});

// Instantiate B class
var b = new B({
	three: '3'
});

// Display the contents
console.log("A", a.toString());
console.log("B", b.toString());




/*************************************************
 *          Adding Attributes to Models
 *************************************************/
console.log('----------ADDING ATTRIBUTES TO MODELS--------');
var Animal = Backbone.Model.extend({
	toString: function() {
		return JSON.stringify(this.toJSON());
	}
});

// There are two ways to add an attribute to an instance
// 1) Add into the constructor
// 2) Add using 'set'

// Add into the constructor 
var animal = new Animal({
	type: 'cat'
});

// Add using set
var animal2 = new Animal();
animal2.set('type', 'dog');

console.log('Animal 1', animal.toString());
console.log('Animal 2', animal2.toString());




/*************************************************
 *          Getting Attributes from Models
 *************************************************/
console.log('----------ADDING ATTRIBUTES TO MODELS--------');

// There are two ways to get attributes from models
// 1) get
// 2) escape

// Create Animal and an instance of Animal
var Animal = Backbone.Model.extend({});
var animal = new Animal();

// Set an attribute
animal.set('type', 'cat');

// Get the attribute
var type = animal.get('type');
console.log("Animal type should == cat: ",type);

// Escape the attribute
animal.set('description', '<script>alert("Such a hacker");</script>');

// Get will display the alert "Such a hacker"
$('body').append(animal.get('description'));

// Escape will HTML encode the value of the description field
// It'll actually append the html ontot he page
$('body').append(animal.escape('description'));



/*************************************************
 *       Check if Model's attribute exists
 *************************************************/
console.log('----------ADDING ATTRIBUTES TO MODELS--------');

// Create Animal Class, an instance of Animal, and set happinessLevel as its attribute
var Animal = Backbone.Model.extend({});
var animal = new Animal();
animal.set('happinessLevel', '10');

// Check if animal has an attribute defined
console.log('Does animal have "happinessLevel" as an attribute?: ', animal.has('happinessLevel'));
console.log('Does animal have "evilLevel" as an attribute?: ', animal.has('evilLevel'));




/*************************************************
 *                 Model events
 *************************************************/
console.log('----------MODEL EVENTS--------');

// There are three ways to manage change
// 1) Model Specific
// 2) Attribute Specific
// 3) Custom Event Handler

// Create Animal Class, an instance of Animal, and set happinessLevel as its attribute
var Animal = Backbone.Model.extend({
	color: 'black', 
	age: 10
});
var animal = new Animal();

// 1) Model specific change
animal.on('change', function() {
	console.log("Something has definitley changed");
})

// 2) Attribute specific change
animal.on('change:age', function() {
	console.log("Age has changed");
})

// 3) Custom model event
animal.on('tired', function() {
	console.log("Animal is tired");
});

// Change color -> Runs only 1)
animal.set('color', 'blue');

// Change age -> Runs both 1) and 2)
animal.set('age', 12);

// Trigger the custom event --> Runs only 3)
animal.trigger('tired');




/*************************************************
 *                Model Identity
 *************************************************/
console.log('----------MODEL IDENTITY--------');

// There are two id's
// 1) CID - Local id on client side
// 2) ID - Stored id on server side

var Animal = Backbone.Model.extend({});
var animal = new Animal();

// Id == undefined atm, since it hasn't been saved to server yet
console.log("Animal id:", animal.id);


// Cid is a local id, created when the animal object is created
console.log("Animal cid:", animal.cid);


// isNew() checks if the id has been saved to server yet
// True ==> Yes, object is new ==> Id should be undefined
// False ==> No, object is not new ==> Id should have been saved to server
//           at least once before
console.log("Animal cid:", animal.isNew());




/*************************************************
 *                Model Defaults
 *************************************************/
console.log('----------MODEL DEFAULTS--------');

// 'defaults: { attribute : value }' specifies default values for attributes

// Create the class with default attributes
var Vehicle = Backbone.Model.extend({
	defaults: {
		color: 'red', 
		type: 'sedan'
	}
});

// Create instance
var vehicle = new Vehicle();

// Check the values of the attributes
console.log(vehicle.get('color')); // red
console.log(vehicle.get('type'));  // sedan




/*************************************************
 *                Model Defaults
 *************************************************/
console.log('----------MODEL VALIDATION--------');

// validate: function(attrs) {} allows you to validate specific objects

// Create a Vehicle class
var Vehicle = Backbone.Model.extend({
	validate: function(attrs) {
		var validColors = ['red', 'white', 'blue']; //'murica
		var colorIsValid = function(attrs) {
			if(!attrs.color) { return true; }
			return _(validColors).include(attrs.color);
		}
		if(!attrs.color) {
			return attrs.color +"is not allowed. Try again please!";
		}
	}
});

// Create an instance of vehicle with validation logic
var vehicle = new Vehicle();

// Create the error handler
vehicle.on('error', function(model, error) {
	console.log(error);
});

// Test the error handler
vehicle.set('happy', 'true'); // succeeds (no error since no color has been defined)
vehicle.set('color', 'red');  // succeeds (no error since this color is valid)
vehicle.set('color', 'pink'); // throws an error
vehicle.get('color'); // won't run until the color is set to a valid color




/*************************************************
 *                Model toJSON
 *************************************************/
console.log('----------MODEL TOSJON--------');

// Create Animal class and instantiate it
var Animal = Backbone.Model.extend({});
var animal = new Animal( { hungry: 'true' });

// Jsonify the model
var jsonAnimal = animal.toJSON();

// Serialize the json
var serializedJson = JSON.stringify(jsonAnimal);

// Json version of the animal model
console.log(jsonAnimal);

// Serialized version of Json
console.log(serializedJson);
