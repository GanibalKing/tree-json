/**
* Child of Leaf class
*/
function TreeLeaf(leaf) {
    TreeLeaf.superclass.constructor.apply(this, arguments);
}

extend(TreeLeaf, Leaf);

TreeLeaf.prototype.getName = function() {
    return this._leaf.innerHTML || this._leaf.value;
};

TreeLeaf.prototype.setName = function() {

    var leafContent = this._leaf.parentNode;
    var inputValue = this._leaf.value;
    var span = createElem("span");
    
    if (inputValue.replace(/\s+/g, '').length) {
        if(inputValue.match(/<(.*?)>/g) || !inputValue.match(/[A-Za-zА-Яа-яЁёі]/)){
            inputValue = "New Item";
        }
        span.innerHTML = inputValue;

    } else {
        span.innerHTML = "New Item";

    }

    leafContent.removeChild(this._leaf);
    leafContent.appendChild(span);
};

TreeLeaf.prototype.rename = function() {
    var oldValue = this._leaf.innerHTML;

    var parent = this._leaf.parentNode;

    parent.removeChild(this._leaf);

    var input = createElem("input");
    input.value = oldValue;

    parent.appendChild(input);
    input.focus();

};

TreeLeaf.prototype.insertLeafFirst = function() {
    var parent = this._leaf.parentNode.parentNode;

    var li = createElem('li');
    var content = createElem('div');
    addClass(content, 'content');

    var enterText = createElem("input");
    enterText.maxLength = 15;

    content.appendChild(enterText);

    li.appendChild(content);
    li.id = Math.round(Math.random() * (3000 - 1000) + 1000);

    parent.parentNode.insertBefore(li, parent.parentNode.firstChild);
    enterText.focus();
};

TreeLeaf.prototype.insertLeafLast = function() {
    var parent = this._leaf.parentNode.parentNode;

    var li = createElem('li');
    var content = createElem('div');
    addClass(content, 'content');

    var enterText = createElem("input");

    content.appendChild(enterText);

    li.appendChild(content);
    li.id = Math.round(Math.random() * (3000 - 1000) + 1000);

    parent.parentNode.appendChild(li);
    enterText.focus();
};

TreeLeaf.prototype.createNode = function() {

    var parent = this._leaf.parentNode.parentNode;

    var hasUl = getElem("ul", parent);
    var li = createElem('li');
    var content = createElem('div');
    var enterText = createElem("input");

    if (hasUl !== null) {

        removeClass(parent, "nodeClose");
        addClass(parent, "nodeOpen");

        addClass(content, 'content');

        content.appendChild(enterText);

        li.appendChild(content);
        li.id = Math.round(Math.random() * (3000 - 1000) + 1000);

        hasUl.appendChild(li);
        enterText.focus();

    } else {
        // item
        var toggleDiv = createElem("div");

        addClass(parent, "nodeOpen");

        addClass(toggleDiv, 'toggleDiv');

        // container
        var ul = createElem('ul');

        addClass(content, 'content');

        content.appendChild(enterText);

        li.appendChild(content);
        li.id = Math.round(Math.random() * (3000 - 1000) + 1000);

        ul.appendChild(li);
        parent.insertBefore(toggleDiv, this._leaf.parentNode);
        parent.appendChild(ul);

        enterText.focus();
    }

};

TreeLeaf.prototype.insertAfterLeaf = function() {
    var parent = this._leaf.parentNode.parentNode;

    var li = createElem('li');
    var content = createElem('div');
    addClass(content, 'content');

    var enterText = createElem("input");

    content.appendChild(enterText);

    li.appendChild(content);
    li.id = Math.round(Math.random() * (3000 - 1000) + 1000);

    parent.parentNode.insertBefore(li, parent.nextSibling);
    enterText.focus();
};

TreeLeaf.prototype.insertBeforeLeaf = function() {
    var parent = this._leaf.parentNode.parentNode;

    var li = createElem('li');
    var content = createElem('div');
    addClass(content, 'content');

    var enterText = createElem("input");

    content.appendChild(enterText);

    li.appendChild(content);
    li.id = Math.round(Math.random() * (3000 - 1000) + 1000);

    parent.parentNode.insertBefore(li, parent);
    enterText.focus();
};

TreeLeaf.prototype.deleteLeaf = function() {
    var item = this._leaf.parentNode.parentNode;

    var parentLi = item.parentNode.parentNode;

    var container = getElem("ul", parentLi);

    var toggleDiv = getElem(".toggleDiv", parentLi);

    if (container.childNodes.length == 1) {
        parentLi.removeChild(container);

        if(toggleDiv){
            parentLi.removeChild(toggleDiv);
        }
        
        removeClass(parentLi, "nodeOpen");

        item.parentNode.removeChild(item);
    } else {
        item.parentNode.removeChild(item);
    }

};