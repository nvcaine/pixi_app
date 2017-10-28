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

	this.sprite.buttonMode = true;
	this.sprite.interactive = true;
}

/**
 * Create a sprite object with a random graphic
 * @return PIXI.Sprite
 */
ShapeSprite.prototype.createNewSprite = function() {

	var sides = 1 + parseInt(Math.random() * 6);
	var graphic = this.getGraphic(sides);

	return new PIXI.Sprite(graphic.generateTexture());
}

/**
 * Create graphic object based on number of sides
 * @param sides number of sides
 * @return PIXI.Graphics
 */
ShapeSprite.prototype.getGraphic = function(sides) {

	switch(sides) {
		case 1:
			return this.getCircleGraphic();
		case 2:
			return this.getEllipseGraphic();
		case 3:
			return this.getTriangleGraphic();
		case 4:
			return this.getSquareGraphic();
		case 5:
			return this.getPentaGraphic();
		case 6:
			return this.getHexaGraphic();
	}
}

/**
 * Get a graphic object representing a triangle
 * @return PIXI.Graphics
 */
ShapeSprite.prototype.getTriangleGraphic = function() {

	var graphic = new PIXI.Graphics();

	graphic.beginFill(this.getRandomColor());
	graphic.lineStyle(4, this.getRandomColor(), 1);
	graphic.drawPolygon([
		25, 0,
		0, 50,
		50, 50,
		25, 0
	]);
	graphic.endFill();

	return graphic;
}

/**
 * Get a graphic object representing a square
 * @return PIXI.Graphics
 */
ShapeSprite.prototype.getSquareGraphic = function() {

	var graphic = new PIXI.Graphics();

	graphic.beginFill(this.getRandomColor());
	graphic.lineStyle(4, this.getRandomColor(), 1);
	graphic.drawPolygon([
		0, 0,
		0, 50,
		50, 50,
		50, 0,
		0, 0
	]);
	graphic.endFill();

	return graphic;
}

/**
 * Get a graphic object representing a pentagon
 * @return PIXI.Graphics
 */
ShapeSprite.prototype.getPentaGraphic = function() {

	var graphic = new PIXI.Graphics();

	graphic.beginFill(this.getRandomColor());
	graphic.lineStyle(4, this.getRandomColor(), 1);
	graphic.drawPolygon([
		25, 0,
		0, 20,
		10, 50,
		40, 50,
		50, 20,
		25, 0
	]);
	graphic.endFill();

	return graphic;
}

/**
 * Get a graphic object representing a hexagon
 * @return PIXI.Graphics
 */
ShapeSprite.prototype.getHexaGraphic = function() {

	var graphic = new PIXI.Graphics();

	graphic.beginFill(this.getRandomColor());
	graphic.lineStyle(4, this.getRandomColor(), 1);
	graphic.drawPolygon([
		10, 0,
		0, 25,
		10, 50,
		40, 50,
		50, 25,
		40, 0,
		10, 0]);
	graphic.endFill();

	return graphic;
}

/**
 * Get a graphic object representing a circle
 * @return PIXI.Graphics
 */
ShapeSprite.prototype.getCircleGraphic = function() {

	var graphic = new PIXI.Graphics();

	graphic.lineStyle(4, this.getRandomColor(), 1);
	graphic.beginFill(this.getRandomColor());
	graphic.drawCircle(25, 25, 25);
	graphic.endFill();

	return graphic;
}

/**
 * Get a graphic object representing a circle
 * @return PIXI.Graphics
 */
ShapeSprite.prototype.getEllipseGraphic = function() {

	var graphic = new PIXI.Graphics();

	graphic.lineStyle(4, this.getRandomColor(), 1);
	graphic.beginFill(this.getRandomColor());
	graphic.drawEllipse(25, 25, 25, 20);
	graphic.endFill();

	return graphic;
}

ShapeSprite.prototype.getRandomColor = function() {
	return '0x' + (Math.random() * 0xFFFFFF << 0).toString(16);
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