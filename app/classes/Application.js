/**
 * Class used to wrap initialization logic
 */
var Application = function() {

	this.renderer = PIXI.autoDetectRenderer(256, 256);
	this.stage = new PIXI.Container(0x000000);
	this.ticker = new PIXI.ticker.Ticker();
	this.spriteManager = undefined; // init the sprite manager once the stage is initialized
	this.eventManager = new EventManager();
 }

/**
 * Initialize the renderer, stage, ticker and SpriteManager members
 */
Application.prototype.start = function(headerHeight, footerHeight) {

	var instance = this;

	this.initRenderer(headerHeight, footerHeight);
	this.initStage(headerHeight, footerHeight);

	this.ticker.add(this.renderStage, this);
	this.ticker.start();

	this.spriteManager = new SpriteManager(this.stage);

	// listen for added sprites and update the count input value
	this.eventManager.addEventListener(EventManager.ADD_SHAPE_EVENT, function(event) {
		$('#total-sprites-count').val(event.detail.total);
	})

	// init gravity controls
	this.initValueControl('#gravity-value', '#gravity-increase', '#gravity-decrease', function() {
		instance.spriteManager.updateGravityValue(parseInt($(this).val()));
	});

	// init shapes-per-second controls
	this.initValueControl('#shapes-value', '#shapes-increase', '#shapes-decrease', function() {
		instance.spriteManager.updateSpritesPerSecond(parseInt($(this).val()));
	});
}

/**
 * Initalize the renderer object and make the canvas cover maximum screen area
 * @param headerHeight the height of the header to offset when defining the canvas height
 * @param footerHeight the height of the footer to offset when defining the canvas height
 */
Application.prototype.initRenderer = function(headerHeight, footerHeight) {

	$('body').append(this.renderer.view);

	this.renderer.view.style.position = "absolute";
	this.renderer.view.style.display = "block";
	this.renderer.autoResize = true;

	this.resizeCanvas(headerHeight, footerHeight);
}

/**
 * Initialize the stage object, taking into account the footer and header height
 * @param headerHeight the height of the header to offset when defining the stage height
 * @param footerHeight the height of the footer to offset when defining the stage height
 */
Application.prototype.initStage = function(headerHeight, footerHeight) {

	var stageHeight = window.innerHeight - (headerHeight + footerHeight);
	var baseObject = new PIXI.Graphics().beginFill(0x000000).drawRect(0, 0, window.innerWidth, stageHeight);
	var instance = this; // used to access the Application instance inside the click handler

	this.stage.interactive = true;
	this.stage.click = function(event) {
		instance.handleStageClick(event);
	};
	this.stage.tap = this.clickHandler; // also handle touch events
	this.stage.addChild(baseObject);
}

/**
 * Render the stage and update the sprites
 */
Application.prototype.renderStage = function() {

	this.renderer.render(this.stage);
	this.spriteManager.updateSprites();
}

/**
 * Update canvas width and height based on current window size
 */
Application.prototype.resizeCanvas = function(headerHeight, footerHeight) {

	this.renderer.resize(window.innerWidth, window.innerHeight - (headerHeight + footerHeight));
}

/**
 * Add a new sprite on click, update total sprite count
 * @param event the click event
 */
Application.prototype.handleStageClick = function(event) {

	this.spriteManager.addSprite(event.data.global.x, event.data.global.y);
}

/**
 * Initalize listeneres and handle value update events for gravity and shapes-per-second controls
 * @param textInputSelector selector string for gravity value text input
 * @param increaseButtonSelector selector string for increasing gravity value
 * @param decreaseButtonSelector selector string for decreasing gravity value
 * @param handler the function to be executed once the input value has been updated
 */
Application.prototype.initValueControl = function(textInputSelector, increaseButtonSelector, decreaseButtonSelector, handler) {

	var instance = this;

	$(textInputSelector).change(handler);

	$(increaseButtonSelector).click( function() {
		var valueElement = $(textInputSelector);
		var newValue = parseInt(valueElement.val()) + 1;
		valueElement.val(newValue).change();
	});

	$(decreaseButtonSelector).click( function() {
		var valueElement = $(textInputSelector);
		var newValue = parseInt(valueElement.val()) - 1;

		if(newValue > -1)
			valueElement.val(newValue).change();
	});

}