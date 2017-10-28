/**
 * Class used to wrap initialization logic
 * @param clickHandler - function used to wrap the instance click handler
 */
var Application = function(clickHandler) {

	this.renderer = PIXI.autoDetectRenderer(256, 256);
	this.stage = new PIXI.Container(0x000000);
	this.ticker = new PIXI.ticker.Ticker();
	this.spriteManager = undefined; // init the sprite manager once the stage is initialized
	this.clickHandler = clickHandler; // wrap the click handler so the app instance is accessible
 }

/**
 * Update canvas width and height based on current window size
 */
Application.prototype.resizeCanvas = function() {

	var headerHeight = $('#header').outerHeight();
	var footerHeight = $('footer').outerHeight()

	this.renderer.resize(window.innerWidth, window.innerHeight - (headerHeight + footerHeight));
}

/**
 * Initialize the renderer, stage, ticker and SpriteManager members
 */
Application.prototype.start = function() {

	this.initRenderer();
	this.initStage();

	this.ticker.add(this.renderStage, this);
	this.ticker.start();

	this.spriteManager = new SpriteManager(this.stage)
	this.spriteManager.addSprite(10, 10);
}

/**
 * Render the stage and update the sprites
 */
Application.prototype.renderStage = function() {

	this.renderer.render(this.stage);
	this.spriteManager.updateSprites(2);
}

/**
 * Initalize the renderer object and make the canvas cover maximum screen area
 */
Application.prototype.initRenderer = function() {

	$('body').append(this.renderer.view);

	this.renderer.view.style.position = "absolute";
	this.renderer.view.style.display = "block";
	this.renderer.autoResize = true;

	this.resizeCanvas();
}

/**
 * Initialize the stage object, taking into account the footer and header height
 */
Application.prototype.initStage = function() {

	var headerHeight = $('#header').outerHeight();
	var footerHeight = $('footer').outerHeight();
	var stageHeight = window.innerHeight - (headerHeight + footerHeight);

	var baseObject = new PIXI.Graphics().beginFill(0x006600).drawRect(0, 0, window.innerWidth, stageHeight);
	this.stage.interactive = true;
	this.stage.click = this.clickHandler;
	this.stage.addChild(baseObject);
}

/**
 * Add a new sprite on click, update total sprite count
 * @param event the click event
 */
Application.prototype.handleStageClick = function(event) {

	this.spriteManager.addSprite(event.data.global.x, event.data.global.y);
	this.updateTotalSpritesDisplay('#total-sprites-count');
}

/**
 * Display the current number of sprites
 * @param elementSelector the selector string of the element(s) that display the sprite count
 */
Application.prototype.updateTotalSpritesDisplay = function(elementSelector) {
	$(elementSelector).val(this.spriteManager.getSpriteCount());
}