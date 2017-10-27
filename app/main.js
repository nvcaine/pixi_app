var renderer = PIXI.autoDetectRenderer(256, 256);

$('body').append(renderer.view);

var stage = new PIXI.Container();

renderer.render(stage);

renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {

	var headerHeight = $('#header').outerHeight();
	var footerHeight = $('footer').outerHeight()

	renderer.resize(window.innerWidth, window.innerHeight - (headerHeight + footerHeight));
}