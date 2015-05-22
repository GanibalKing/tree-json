/**
 * Class protocol - log of tree
 * @param{object} - protocol list
 */
function Protocol(protocol) {
    this._protocol = protocol;
}

/**
 * Add string to protocol when use rename metods
 * @param{string} - oldValue - old leaf name
 * @param{string} - newValue - new leaf name
 */
Protocol.prototype.addRenameLog = function(oldValue, newValue) {
  /* Override */
};
/**
 * Add string to protocol when use delete metod
 * @param{string} - deleteValue - deleted leaf name
 */
Protocol.prototype.addDeleteLog = function(deleteValue) {
  /* Override */
};

/**
* Get protocol from localStorage
*/
Protocol.prototype.getProtocol = function(){
	/* Override */
};

/**
* Save protocol to localStorage
*/
Protocol.prototype.setProtocol = function(){
	/* Override */
};

/**
* Delete protocol from localStorage
*/
Protocol.prototype.clearProtocol = function(){
	/* Override */
};