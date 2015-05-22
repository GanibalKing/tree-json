/**
 * Class item - item of tree
 * @param {object} - item of tree
 */
function Leaf(leaf) {
    this._leaf = leaf;
}

/**
 * Get item name
 */
Leaf.prototype.getName = function() {
   return this._leaf.innerHTML;
};

/**
 * Set item name
 * @param {string} - name of item
 */
Leaf.prototype.setName = function(name) {
    this._leaf.innerHTML = name;
};

/**
* Create first item of list
*/
Leaf.prototype.insertLeafFirst = function() {
    /* Override */
};

/**
* Create last item of list
*/
Leaf.prototype.insertLeafLast = function() {
    /* Override */
};

/**
 * Create Node
 */
Leaf.prototype.createNode = function() {
    /* Override */
};
/**
 * Create next item
 */
Leaf.prototype.insertAfterLeaf = function() {
	var elem;  // 
    this._leaf.parentNode.insertBefore(elem, this._leaf.nextSibling);
};

/**
 * Create previous item
 */
Leaf.prototype.insertBeforeLeaf = function() {
	var elem; //
    this._leaf.parentNode.insertBefore(elem, this._leaf);
};

/**
 * Delete item
 */
Leaf.prototype.deleteLeaf = function() {
  this._leaf.parentNode.removeChild(this._leaf);
};