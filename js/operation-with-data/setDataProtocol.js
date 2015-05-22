/**
 * Create arrey from list
 * @param{object} - elements list
 */
function createArreyProtocol(itemList) {
    var arr = [];
    var listLi = itemList.childNodes;

    for (var i = 0, length = listLi.length; i < length; i++) {
        var obj = {};
        var logItemName = listLi[i].innerHTML;
        obj.logItemName = logItemName;
        arr.push(obj);
    }

    return arr;
}