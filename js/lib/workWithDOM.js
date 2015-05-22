/**
 *  Functions for work with DOM
 */
// use short window.document
var doc = window.document;
// 
/**
 *  Get elem by id
 *  @param {string} id - element id
 * @param {object} - DOM element
 */
function getId(id, elem) {
    var elem = elem || doc;
    return elem.getElementById(id);
}

/**
 * Get elem by tag name
 * @param {string} tag - tag mane
 * @param {object} - DOM element
 */
function getTag(tag, elem) {
    var elem = elem || doc;
    return elem.getElementsByTagName(tag);
}

/**
 * Get elem by selector name
 *@param {string} - selector - name of elem selector
 * @param {object} - DOM element
 */
function getElem(selector, elem) {
    var elem = elem || doc;
    return elem.querySelector(selector);
}

/**
 * Cet elems by selectors names
 * @param {string} selectors - name  of elements electors
 * @param {object} - DOM element
 */
function getElemsList(selectors, elem) {
    var elem = elem || doc;
    return elem.querySelectorAll(selectors);
}

/**
 * Get forEach metod in Array
 */
NodeList.prototype.forEach = Array.prototype.forEach;

/**
 * Get length metod in Array
 */
NodeList.prototype.length = Array.prototype.length;

/**
 * Create element
 * @param {string} - name of tag
 */
function createElem(elem) {
    return doc.createElement(elem);
}

/**
 * Add class to DOM elem
 * @param{object} elem - DOM element
 * @param{string} clazz - class name
 */
function addClass(elem, clazz) {
    var c = elem.className.split(' ');
    for (var i = 0; i < c.length; i++) {
        if (c[i] == clazz) return;
    }

    if (elem.className == '') elem.className = clazz;
    else elem.className += ' ' + clazz;
}

/**
 * Remove class in DOM elem
 * @param{object} elem - DOM element
 * @param{string} clazz - class name
 */
function removeClass(elem, clazz) {
    var c = elem.className.split(' ');
    for (var i = 0; i < c.length; i++) {
        if (c[i] == clazz) c.splice(i--, 1);
    }

    elem.className = c.join(' ');
}

/**
 * Check class to DOM elem
 * @param{object} elem - DOM element
 * @param{string} clazz - class name
 */
function hasClass(elem, clazz) {
    for (var c = elem.className.split(' '), i = c.length - 1; i >= 0; i--) {
        if (c[i] == clazz) return true;
    }
    return false;
}