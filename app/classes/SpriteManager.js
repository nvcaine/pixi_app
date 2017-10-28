/**
 * SpriteManager constructor
 * @param stage PIXI.Container
 */
var SpriteManager = function(stage) {

	this.stage = stage;
	this.sprites = [];
	this.recycledSprites = [];
	this.heightLimit = stage.height;
	this.gravityValue = 2;
	this.interval = undefined;

	this.eventManager = new EventManager();
}

/**
 * Add a sprite on stage using the specified coordinate.
 * When a sprite is added, an event is dispatched with the total number of sprites on stage.
 * @param x the horizontal coordinate of the sprite
 * @param y the vertical coordinate of the sprite
 */
SpriteManager.prototype.addSprite = function(x, y) {

	var shapeSprite;

	if(this.recycledSprites.length > 0) {
		shapeSprite = this.recycledSprites.pop();
		shapeSprite.reset(x, y);
	} else {
		shapeSprite = new ShapeSprite(x, y);
	}

	var sprite = shapeSprite.getSprite();
	var instance = this;

	this.stage.addChild(sprite);
	this.sprites.push(shapeSprite);

	// dispatch an event with the number of sprites on stage
	this.eventManager.dispatchEvent(EventManager.UPDATE_SHAPES_COUNT_EVENT, {total: this.sprites.length});

	// remove the sprite and wrapper, then update the total count
	sprite.on('pointerup', function(event) {
		event.stopPropagation(); // do not bubble the event to the stage
	
		instance.stage.removeChild(sprite);
		instance.sprites.splice(instance.sprites.indexOf(shapeSprite), 1);
		instance.eventManager.dispatchEvent(EventManager.UPDATE_SHAPES_COUNT_EVENT, {total: instance.sprites.length});
	});
}

/**
 * Parse and update current sprites
 * @param speed the gravity value used to update the sprites
 */
SpriteManager.prototype.updateSprites = function() {

	for(i = 0; i < this.sprites.length; i++) {
		var sprite = this.sprites[i];

		if(sprite.getSprite().y > this.heightLimit) {
			this.recycledSprites.push(sprite);
			this.stage.removeChild(sprite.getSprite());
			this.sprites.splice(this.sprites.indexOf(sprite), 1);
			this.eventManager.dispatchEvent(EventManager.UPDATE_SHAPES_COUNT_EVENT, {total: this.sprites.length});
		} else {
			sprite.update(this.gravityValue, this.heightLimit);
		}
	}
}

/**
 * Set a new value for the gravity parameter
 * @param value the gravity value
 */
SpriteManager.prototype.updateGravityValue = function(value) {

	this.gravityValue = value;
}

/**
 * Set an interval to generate the specified number of shapes per second
 * @param spritesPerSecond the number of sprites to generate in a second
 */
SpriteManager.prototype.updateSpritesPerSecond = function(spritesPerSecond) {

	var delay = parseInt(1000 / spritesPerSecond);
	var instance = this;

	if(this.interval !== undefined)
		clearInterval(this.interval);

	if(delay > 0)
		this.interval = setInterval( function() {
			var x = parseInt(Math.random() * (instance.stage.width - 25)) + 25;
			instance.addSprite(x, 0);
		}, delay);
}