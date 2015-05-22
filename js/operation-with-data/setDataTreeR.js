/**
* Create arrey from list
* @param{object} - elements list
*/
function createArreyList(itemList) {
    var arr = [];
    var listLi = itemList.childNodes;
    
    for (var i = 0, length = listLi.length; i < length; i++) {
        if (itemList.childNodes[i].nodeType == 1) {

            var GROUPID = listLi[i].getAttribute("id");
            var NAMEGROUP = getElem("span", listLi[i]).innerHTML;
            var icon = null;

            var ul = getElem("ul", listLi[i]);

            var obj = {};
            obj.GROUPID = GROUPID;
            obj.NAMEGROUP = NAMEGROUP;
            obj.icon = null;

            if (ul !== null) {
                obj.dropmenu = createArreyList(ul);
            }

            arr.push(obj);
        }

    }

    return arr;
}