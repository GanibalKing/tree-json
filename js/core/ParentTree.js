/**
* Class Tree
* @param{tree} - list of elements
*/
function ParentTree(tree){
	this._tree = tree;
}

/**
* Create item unless have a child
*/
ParentTree.prototype.createLeaf = function(){
	/* Override */
};

/**
* Save list
*/
ParentTree.prototype.setTree = function(){
	/* Override*/
};

/**
* Get Tree
* @param{object} - dataFile -  JSON file or JSON string from localStorage
*/
ParentTree.prototype.getTree = function(dataFile){
	/* Override */
};

/**
* Delete tree from localStorage
*/
ParentTree.prototype.clearTree = function(){
	/* Overrride */
};