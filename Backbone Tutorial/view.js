
/*************************************************
 *        Instantiating Backbone Views
 *************************************************/
console.log('----------INSTANTIATING BACKBONE VIEWS--------');

// There are two ways to create a view
// 1) Extending Backbone.View
// 2) Instantiating Backbone.View

// 1) Extending Backbone.View
var VehicleListView = Backbone.View.extend({});

// 2) Insantiating Backbone.View
var VehicleListView = new Backbone.View();

// Create a View with properties
var V = Backbone.View.extend({
	tagName: 'li', 
	id: 'item', 
	className: 'active', 
	attributes: {
		'data-value': 12345
	}
});

// Instatiate the View
var v = new V();

// Add to the DOM (View won't show until you add it to something)
// Each view that has something to be added to the dom
// should have an el property (el is short for element)
$('body').append(v.el);


/*************************************************
 * Instantiating Backbone Views (Existing Content)
 *************************************************/
console.log('----------INSTANTIATING BACKBONE VIEWS EXISTING CONTENT--------');

// Create Views based on existing HTML content
// ASSUME: <div id="text">Hello!</div> exists in the HTML
var V = Backbone.View.extend({});
var v = new V({el: '#text'});
v.$el.css('background-color', 'red');




/*************************************************
 *     Instantiating Backbone Views w/ Model
 *************************************************/
console.log('----------INSTANTIATING BACKBONE VIEWS W/ MODEL--------');

// Create a model and give it a content object
var model = new Backbone.Model();
model.set('content', 'New content!');

// Create a view, add the model to it, and assign it a class
var view = new Backbone.View({
	model: model,
	className: 'model-example'
});

// Append a div w/ model-example as its class to the DOM
$('body').append(view.el);



/*************************************************
 *                  The El Operator
 *************************************************/
console.log('----------THE EL OPERATOR---------');

// The el is the element the view should be tied to
var view = new Backbone.View({el: 'body'});
console.log(view.el); // <body></body>

//$el == $(this.el), just makes it easier for us to edit
//various properties of the view. Such as it's css, attributes, etc
console.log(view.$el); // [<body></body>]

/*************************************************
 *                     Render
 *************************************************/
console.log('----------RENDER---------');

// Rendering is a special method to display the 
// contents of the view to the HTML

// Creates a view with a render function to display 'HTML CONTENT' to the screen
var View = Backbone.View.extend({
	render: function() {
		this.$el.html('HTML CONTENT');
		return this; // convention to return this to chain methods
	}
});




/*************************************************
 *     Render Automatically on Model Change
 *************************************************/
console.log('----------RENDER AUTOMATICALLY ON MODEL CHANGE---------');
// Add on change listener for changes on the model in
// the view's initialize method

var RefreshingView = Backbone.View.extend({
	tagName: 'p',
	initialize: function() {
		this.model.on('change', function() {
			this.render();
		}, this);
	}, 
	render: function() {
		this.$el.html(this.model.get('text'));
		return this;
	}
});
var model = new Backbone.Model();
model.set('text', new Date().toString());
var view = new RefreshingView({ model: model });
$('body').append(view.render().el);

/*setInterval(function() {
	model.set('text', new Date().toString());
}, 1000);*/




/*************************************************
 *         Remove - Removing DOM Elements
 *************************************************/
console.log('----------REMOVE - Removing DOM ELEMENTS---------');
// Removing DOM elements --> $(this).remove() 

var model = new Backbone.Model({
	content: 'Hi welcome!'
});

var View = Backbone.View.extend({
	tagName: 'p',
	render: function() {
		this.$el.html(this.model.get('content'));
		return this;
	}
});

var view = new View({ model: model });
$('body').append(view.render().el);

view.remove();