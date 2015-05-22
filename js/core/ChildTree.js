/**
 * Child of ParentTree class
 */
function ChildTree(tree) {
    ParentTree.apply(this, arguments);
}

extend(ChildTree, ParentTree);

ChildTree.prototype.createLeaf = function() {

    var ul = createElem('ul');

    var li = createElem('li');
    var content = createElem('div');
    var enterText = createElem("input");

    content.appendChild(enterText);
    addClass(content, 'content');

    li.appendChild(content);
    ul.appendChild(li);

    this._tree.appendChild(ul);

    enterText.focus();
};

ChildTree.prototype.setTree = function() {
    var list = getElem("ul", this._tree);

    var arrList = createArreyList(list);

    if (typeof(Storage) !== "undefined") {
        localStorage.removeItem('dataTree');

        localStorage.setItem('dataTree', JSON.stringify(arrList));
    } else {
        alert("Sorry, your browser does not support web storage...");
    }

    location.reload();

};

ChildTree.prototype.getTree = function(dataFile) {
    if (typeof(Storage) !== "undefined") {
        var storageData = localStorage.getItem('dataTree');

        if (storageData) {
            getDataFromStorage(this._tree, storageData);
        } else {
            getDataFromFile(this._tree, dataFile);
        }
    } else {
        alert("Sorry, your browser does not support web storage...");
    }

};

ChildTree.prototype.clearTree = function() {
    if (typeof(Storage) !== "undefined") {
        localStorage.removeItem('dataTree');
    } else {
        alert("Sorry, your browser does not support web storage...");
    }

    location.reload();
};