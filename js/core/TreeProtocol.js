/**
 * Child of Protocol class
 */
function TreeProtocol(protocol) {
    Protocol.apply(this, arguments);
}

extend(TreeProtocol, Protocol);

TreeProtocol.prototype.addRenameLog = function(oldValue, newValue) {
    if (oldValue == newValue) {
        return;
    }
    var li = createElem("li");

    newValue = newValue || "New Item";

    if (oldValue && newValue !== oldValue) {
        if (newValue.match(/<(.*?)>/g) || !newValue.match(/[A-Za-zА-Яа-яЁёі]/)) {
            newValue = "New Item";
        }
        if (oldValue.replace(/\s+/g, '').length) {

            li.innerHTML = "Поле " + '"' + oldValue + '"' + " переименовано в " + '"' + newValue + '"';
        }

        // add create log
    } else if (!oldValue) {
        if (newValue.match(/<(.*?)>/g) || !newValue.match(/[A-Za-zА-Яа-яЁёі]/)) {
            newValue = "New Item";
        }
        if (newValue.replace(/\s+/g, '').length) {
            li.innerHTML = 'Создано поле ' + '"' + newValue + '"';
        } else {
            li.innerHTML = 'Создано поле ' + '"' + "New Item" + '"';
        }
    }

    this._protocol.appendChild(li);
};

TreeProtocol.prototype.addDeleteLog = function(deleteValue) {
    var li = createElem("li");

    li.innerHTML = 'Удалено поле ' + '"' + deleteValue + '"';

    this._protocol.appendChild(li);
};

TreeProtocol.prototype.setProtocol = function() {

    var list = this._protocol;

    var arrList = createArreyProtocol(list);

    if (typeof(Storage) !== "undefined") {

        localStorage.removeItem('dataTreeProtocol');

        localStorage.setItem('dataTreeProtocol', JSON.stringify(arrList));

    } else {
        alert("Sorry, your browser does not support web storage...");
    }

    
};

TreeProtocol.prototype.getProtocol = function() {
    if (typeof(Storage) !== "undefined") {
        var storageData = localStorage.getItem('dataTreeProtocol');

        if (storageData) {
            getDataProtocolFromStorage(this._protocol, storageData);
        }
    } else {
        alert("Sorry, your browser does not support web storage...");
    }
};

TreeProtocol.prototype.clearProtocol = function() {
    if (typeof(Storage) !== "undefined") {
        localStorage.removeItem('dataTreeProtocol');
    } else {
        alert("Sorry, your browser does not support web storage...");
    }
};