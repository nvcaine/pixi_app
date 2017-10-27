var renderer = PIXI.autoDetectRenderer(256, 256);
var stage = new PIXI.Container(0x000000);
var ticker = new PIXI.ticker.Ticker();
var spriteManager;

function resizeCanvas() {

	var headerHeight = $('#header').outerHeight();
	var footerHeight = $('footer').outerHeight()

	renderer.resize(window.innerWidth, window.innerHeight - (headerHeight + footerHeight));
}

function initPixiRenderer() {

	var headerHeight = $('#header').outerHeight();
	var footerHeight = $('footer').outerHeight();
	var gameWidth = window.innerWidth;
	var gameHeight = window.innerHeight - (headerHeight + footerHeight);

	$('body').append(renderer.view);

	stage.interactive = true;
	stage.click = handleStageClick;

	var baseObject = new PIXI.Graphics().beginFill(0x006600).drawRect(0, 0, gameWidth, gameHeight);
	stage.addChild(baseObject);

	renderer.view.style.position = "absolute";
	renderer.view.style.display = "block";
	renderer.autoResize = true;

	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);

	ticker.add(renderStage, this);
	ticker.start();

	spriteManager = new SpriteManager(stage);
	spriteManager.addSprite(10, 10);
}

function renderStage() {
    renderer.render(stage);
    spriteManager.updateSprites(2);
}

function handleStageClick(event) {
	//console.log(event.data.global.x + '; ' + event.data.global.y);

	spriteManager.addSprite(event.data.global.x, event.data.global.y);

	updateTotalSpritesDisplay();
}

function updateTotalSpritesDisplay() {
	$('#total-sprites-count').val(spriteManager.getSpriteCount());
}

initPixiRenderer();