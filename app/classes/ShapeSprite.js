/**
 * ShapeSprite constructor
 * @param x the horizontal coordinate of the sprite
 * @param y the vertical coordinate of the sprite
 */
var ShapeSprite = function(x, y) {

	this.sprite = this.createNewSprite();
	this.sprite.x = x;
	this.sprite.y = y;
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
}

/**
 * Get a graphic object representing a triangle
 * @return PIXI.Graphic
 */
ShapeSprite.prototype.getTriangleGraphic = function() {

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
 * Get a graphic object representing a square
 * @return PIXI.Graphic
 */
ShapeSprite.prototype.getSquareGraphic = function() {

	var graphic = new PIXI.Graphics();

	graphic.beginFill(0xFF3300);
	graphic.lineStyle(4, 0xffd900, 1);
	graphic.moveTo(0, 0);
	graphic.lineTo(0, 50);
	graphic.lineTo(50, 50);
	graphic.lineTo(50, 0);
	graphic.lineTo(0, 0);
	graphic.endFill();

	return graphic;
}

/**
 * Get a graphic object representing a pentagon
 * @return PIXI.Graphic
 */
ShapeSprite.prototype.getPentaGraphic = function() {

	var graphic = new PIXI.Graphics();

	graphic.beginFill(0xFF3300);
	graphic.lineStyle(4, 0xffd900, 1);
	graphic.moveTo(25, 0);
	graphic.lineTo(0, 20);
	graphic.lineTo(10, 50);
	graphic.lineTo(40, 50);
	graphic.lineTo(50, 20);
	graphic.lineTo(25, 0);
	graphic.endFill();

	return graphic;
}

/**
 * Get a graphic object representing a hexagon
 * @return PIXI.Graphic
 */
ShapeSprite.prototype.getHexaGraphic = function() {

	var graphic = new PIXI.Graphics();

	graphic.beginFill(0xFF3300);
	graphic.lineStyle(4, 0xffd900, 1);
	graphic.moveTo(10, 0);
	graphic.lineTo(0, 25);
	graphic.lineTo(10, 50);
	graphic.lineTo(40, 50);
	graphic.lineTo(50, 25);
	graphic.lineTo(40, 0);
	graphic.lineTo(10, 0);
	graphic.endFill();

	return graphic;
}

ShapeSprite.prototype.getRandomGraphic = function(sides) {

	switch(sides) {
		case 3:
			return this.getTriangleGraphic();
		case 4:
			return this.getSquareGraphic();
		case 5:
			return this.getPentaGraphic();
	}
	return this.getHexaGraphic();
}

/**
 * Create a sprite object with a random graphic
 * @return PIXI.Sprite
 */
ShapeSprite.prototype.createNewSprite = function() {

	var sides = 3 + parseInt(Math.random() * 4);
	var graphic = this.getRandomGraphic(sides);

	return new PIXI.Sprite(graphic.generateTexture());
}

/**
 * Returns the sprite objectm usually to be added to the stage
 * @return PIXI.Sprite
 */
ShapeSprite.prototype.getSprite = function() {

	return this.sprite;
}

/**
 * Update the vertical position of the sprite and reset it once it's out of stage bounds
 * @param speed the gravity value with which to update the sprite
 * @heightLimit the height of the stage
 */
ShapeSprite.prototype.update = function(speed, heightLimit) {

	this.sprite.y += speed;

	if (this.sprite.y > heightLimit)
		this.sprite.y = 0;
}