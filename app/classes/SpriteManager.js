/**
 * SpriteManager constructor
 * @param stage PIXI.Container
 */
var SpriteManager = function(stage) {
	this.stage = stage;
	this.heightLimit = stage.height;
	this.sprites = [];
}

/**
 * Add a sprite on stage using the specified coordinate
 */
SpriteManager.prototype.addSprite = function(x, y) {

	var sprite = this.createNewSprite();

	sprite.x = x;
	sprite.y = y;
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;

	this.stage.addChild(sprite);
	this.sprites.push(sprite);
}

/**
 * Create a sprite object with a random graphic
 * @return PIXI.Sprite
 */
SpriteManager.prototype.createNewSprite = function() {

	var graphic = this.getRandomGraphic();

	return new PIXI.Sprite(graphic.generateTexture());
}

/**
 * Get a graphic object
 * @return PIXI.Graphic
 */
SpriteManager.prototype.getRandomGraphic = function() {

	var graphic = new PIXI.Graphics();

	graphic.beginFill(0xFF3300);
	graphic.lineStyle(4, 0xffd900, 1);
	graphic.moveTo(25, 0);
	graphic.lineTo(0, 50);
	graphic.lineTo(50, 50);
	graphic.lineTo(25, 0);
	graphic.endFill();

	return graphic;
}

/**
 * Parse and update current sprites
 */
SpriteManager.prototype.updateSprites = function(speed) {

	for(i = 0; i < this.sprites.length; i++)
		this.updateSprite(i, speed);
}

/**
 * Update a sprite's position if it exceeds the stage's bounds
 */
SpriteManager.prototype.updateSprite = function(i, speed) {

	var sprite = this.sprites[i];

	sprite.y += speed;

	if (sprite.y > this.heightLimit)
		sprite.y = 0;
}

/**
 * Return the number of sprites currently displayed
 * @return int
 */
SpriteManager.prototype.getSpriteCount = function() {

	return this.sprites.length;
}