/**
 * Get data protocol from LocalStoradge
 * @param {object} outputElem - DOM element, where you insert Tree
 * @param {string} storageData - contain data
 */
function getDataProtocolFromStorage(outputElem, storageDataProtocol) {

    var data = JSON.parse(storageDataProtocol);
    createJsonProtocol(outputElem, data);

}

/**
 * Create tree( ul list) from array
 * @param {object} objData - array of data
 */
function createJsonProtocol(ul, objData) {

    for (var i = 0, length = objData.length; i < length; i++) {
        if (i in objData) {

            var li = createElem('li');
            li.innerHTML = objData[i].logItemName;

            ul.appendChild(li);
        }
    }
}