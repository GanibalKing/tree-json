/**
 * Inharitance with saved constructor
 * @param{object} Child - children class
 * @param{object} Parent - parent class
 */
function extend(Child, Parent) {
    function F() {}
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}

/**
 * Function for checking children (check leaf in node tree)
 * @param {object} obj - object that is checking on a children
 */
function isChild(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

/**
 * Cross-browser event
 * @param{object} - e - event
 * @param{object} - current element (for IE < 8)
 */
function fixEvent(e, _this) {
    e = e || window.event;

    if (!e.currentTarget) e.currentTarget = _this;
    if (!e.target) e.target = e.srcElement;

    if (!e.relatedTarget) {
        if (e.type == 'mouseover') e.relatedTarget = e.fromElement;
        if (e.type == 'mouseout') e.relatedTarget = e.toElement;
    }

    if (e.pageX === null && e.clientX !== null) {
        var html = document.documentElement;
        var body = document.body;

        e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
        e.pageX -= html.clientLeft || 0;

        e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
        e.pageY -= html.clientTop || 0;
    }

    if (!e.which && e.button) {
        e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
    }

    return e;
}

/**
 * Cross-browser add event listener
 * @param {object} elem - appointed by the element on which the event handler
 * @param {string} eventType - type of event
 * @param {function} handler - event handler
 */
/*function addEvent(elem, eventType, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(eventType, handler, false);
    } else if (elem.attachEvent) {
        elem.attachEvent("on" + eventType, handler);
    } else {
        elem['on' + eventType] = handler;
    }
}*/

/**
 * Cross-browser add event listener with propagation
 * @param {object} elem - appointed by the element on which the event handler
 * @param {string} eventType - type of event
 * @param {function} handler - event handler
 */
function addEvent(elem, eventType, handler) {

    function listenHandler(e) {
        var fn = handler.apply(this, arguments);
        if (fn === false) {
            e.stopPropagation();
            e.preventDefault();
        }
        return (fn);
    }

    function attachHandler() {
        // normalize the target of the event
        window.event.target = window.event.srcElement;
        // make sure the event is passed to the fn also so that works the same too
        // set the this pointer same as addEventListener when fn is called
        var fn = handler.call(elem, window.event);
        // support an optional return false to be cancel propagation and prevent default handling
        // like jQuery does
        if (fn === false) {
            window.event.returnValue = false;
            window.event.cancelBubble = true;
        }
        return (fn);
    }

    if (elem.addEventListener) {
        elem.addEventListener(eventType, listenHandler, false);
    } else if (elem.attachEvent) {
        elem.attachEvent("on" + eventType, attachHandler);
    } else {
        elem['on' + eventType] = handler;
    }

}

/**
 * Cross-browser remove event listener
 * @param {object} elem - appointed by the element on which the event handler
 * @param {string} eventtype - type of event
 * @param {function} handler - event handler
 */
/*function removeEvent(elem, eventType, handler) {
    if (elem.addEventListener) {
        elem.removeEventListener(eventType, handler, false);
    } else if (elem.detachEvent) {
        elem.detachEvent("on" + eventType, handler);
    } else {
        elem['on' + eventType] = null;
    }
}*/

/**
 * Cross-browser remove event listener with propagation
 * @param {object} elem - appointed by the element on which the event handler
 * @param {string} eventtype - type of event
 * @param {function} handler - event handler
 */
function removeEvent(elem, eventType, handler) {

    function listenHandler(e) {
        var fn = handler.apply(this, arguments);
        if (fn === false) {
            e.stopPropagation();
            e.preventDefault();
        }
        return (fn);
    }

    function attachHandler() {
        // normalize the target of the event
        window.event.target = window.event.srcElement;
        // make sure the event is passed to the fn also so that works the same too
        // set the this pointer same as addEventListener when fn is called
        var fn = handler.call(elem, window.event);
        // support an optional return false to be cancel propagation and prevent default handling
        // like jQuery does
        if (fn === false) {
            window.event.returnValue = false;
            window.event.cancelBubble = true;
        }
        return (fn);
    }

    if (elem.removeEventListener) {
        elem.removeEventListener(eventType, listenHandler, false);
    } else if (elem.detachEvent) {
        elem.detachEvent("on" + eventType, attachHandler);
    } else {
        elem['on' + eventType] = null;
    }
}

/**
 * Use dblclick and single click on the same element
 * @param{function} - doubleClickCallback - dblclick handler
 * @param{function} - singleClickCallback - single click handler
 */
function makeDblClick(doubleClickCallback, singleClickCallback) {
    return (function() {
        var clicks = 0,
            timeout;
        return function() {
            clicks++;
            if (clicks == 1) {
                singleClickCallback && singleClickCallback.apply(this, arguments);
                timeout = setTimeout(function() {
                    clicks = 0;
                }, 300);
            } else {
                timeout && clearTimeout(timeout);
                doubleClickCallback && doubleClickCallback.apply(this, arguments);
                clicks = 0;
            }
        };
    }());
}