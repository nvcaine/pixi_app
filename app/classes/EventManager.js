/**
 * Class used to wrap the document object, dispatch and handle events
 */
var EventManager = function() {
}

/**
 * Add a listener for certain type of event
 * @param eventType the name of the event
 * @param handler the function to call when the specified event is received
 */
EventManager.prototype.addEventListener = function(eventType, handler) {
	document.addEventListener(eventType, handler);
}

/**
 * Dispatch an event with additional data
 * @param eventType the type of the event
 * @param data an object to pass with the event
 */
EventManager.prototype.dispatchEvent = function(eventType, data) {

	var e = new CustomEvent(eventType, {detail: data});
	document.dispatchEvent(e);
}

// add a constant to define the 'add shape' event
Object.defineProperty(EventManager, 'UPDATE_SHAPES_COUNT_EVENT', {value: 'update-shapes-count'});