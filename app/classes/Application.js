/**
 * Class used to wrap initialization logic
 * @param clickHandler - function used to wrap the Application click handler
 */
var Application = function(clickHandler) {

	this.renderer = PIXI.autoDetectRenderer(256, 256);
	this.stage = new PIXI.Container(0x000000);
	this.ticker = new PIXI.ticker.Ticker();
	this.spriteManager = undefined; // init the sprite manager once the stage is initialized
	this.clickHandler = clickHandler; // wrap the click handler so the app instance is accessible
 }

/**
 * Initialize the renderer, stage, ticker and SpriteManager members
 */
Application.prototype.start = function(headerHeight, footerHeight) {

	this.initRenderer(headerHeight, footerHeight);
	this.initStage(headerHeight, footerHeight);

	this.ticker.add(this.renderStage, this);
	this.ticker.start();

	this.spriteManager = new SpriteManager(this.stage);
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

	this.stage.interactive = true;
	this.stage.click = this.clickHandler;
	this.stage.tap = this.clickHandler;
	this.stage.addChild(baseObject);
}

/**
 * Render the stage and update the sprites
 */
Application.prototype.renderStage = function() {

	this.renderer.render(this.stage);
	this.spriteManager.updateSprites(2);
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
	this.updateTotalSpritesDisplay('#total-sprites-count');
}

/**
 * Display the current number of sprites
 * @param elementSelector the selector string of the element(s) that display the sprite count
 */
Application.prototype.updateTotalSpritesDisplay = function(elementSelector) {
	$(elementSelector).val(this.spriteManager.getSpriteCount());
}