// create a new application;
var app = new Application( function(event) {
	app.handleStageClick(event);
});

// and run it
app.start($('#header').outerHeight(), $('footer').outerHeight());