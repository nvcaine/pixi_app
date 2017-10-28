/**
 * SpriteManager constructor
 * @param stage PIXI.Container
 */
var SpriteManager = function(stage) {

	this.stage = stage;
	this.sprites = [];
	this.heightLimit = stage.height;
	this.gravityValue = 2;
	this.interval = undefined;
}

/**
 * Add a sprite on stage using the specified coordinate
 * @param x the horizontal coordinate of the sprite
 * @param y the vertical coordinate of the sprite
 */
SpriteManager.prototype.addSprite = function(x, y) {

	var shapeSprite = new ShapeSprite(x, y);

	this.stage.addChild(shapeSprite.getSprite());
	this.sprites.push(shapeSprite);

	document.dispatchEvent(new CustomEvent('added-sprite', {numSprites: this.sprites.length}));
}

/**
 * Parse and update current sprites
 * @param speed the gravity value used to update the sprites
 */
SpriteManager.prototype.updateSprites = function() {

	for(i = 0; i < this.sprites.length; i++)
		this.sprites[i].update(this.gravityValue, this.heightLimit);
}

/**
 * Return the number of sprites currently displayed
 * @return int
 */
SpriteManager.prototype.getSpriteCount = function() {

	return this.sprites.length;
}

SpriteManager.prototype.updateGravityValue = function(value) {

	this.gravityValue = value;
}

SpriteManager.prototype.updateSpritesPerSecond = function(numberOfSpritesPerSecond) {

	var delay = parseInt(1000 / numberOfSpritesPerSecond);
	var instance = this;

	if(this.interval !== undefined)
		clearInterval(this.interval);

	if(delay > 0)
		this.interval = setInterval( function() {
			var x = parseInt(Math.random() * (instance.stage.width - 25)) + 25;
			instance.addSprite(x, 0);
		}, delay);
}