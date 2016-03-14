(function() {

	var Rectangle = Backbone.Model.extend({});
	var RectangleView = Backbone.View.extend({
		
		tagName: 'div', 
		
		className: 'rectangle', 

		events: {
			'click': 'onRectangleClick'
		},

		render: function() {
			this.setDimensions();
			this.setPosition();
			return this;
		}, 

		setDimensions: function() {
			this.$el.css({
				width: this.model.get('width') + 'px',
				height: this.model.get('height') + 'px'
			});
		},

		setPosition: function() {
			var position = this.model.get('position');
			this.$el.css({
				left: position.x,
				top: position.y
			})
		},

		onRectangleClick: function() {
			this.$el.css('left', this.$el.position().left + 10);
		} 

	});

	var myRectangle = new Rectangle({
		width: 100, 
		height: 50, 
		position: {
			x: 300,
			y: 100
		}
	});

	var view = new RectangleView({ model: myRectangle });
	$('div#canvas').append(view.render().el);

})();
