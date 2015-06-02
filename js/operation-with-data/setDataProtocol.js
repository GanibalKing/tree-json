/**
 * Create arrey from list
 * @param{object} - elements list
 */
function createArreyProtocol(itemList) {
    var i, arr = [];
    var listLi = itemList.childNodes;
    var length = listLi.length;

    for (i = 0; i < length; i++) {
        var obj = {};
        var logItemName = listLi[i].innerHTML;
        obj.logItemName = logItemName;
        arr.push(obj);
    }

    return arr;
}