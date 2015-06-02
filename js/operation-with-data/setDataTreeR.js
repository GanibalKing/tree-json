/**
* Create arrey from list
* @param{object} - elements list
*/
function createArreyList(itemList) {
    var i, arr = [];
    var listLi = itemList.childNodes;
    var length = listLi.length;
    
    for (i=0; i < length; i++) {
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