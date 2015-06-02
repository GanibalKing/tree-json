/**
 * Get data from LocalStoradge
 * @param {object} outputElem - DOM element, where you insert Tree
 * @param {string} storageData - contain data
 */
function getDataFromStorage(outputElem, storageData) {

    var data = JSON.parse(storageData);

    insertTree(outputElem, data);
}

/*
 * Get data from JSON file
 * @param {object} outputElem - DOM element, where you insert Tree
 * @param {string} url - contain data
 */
function getDataFromFile(outputElem, url) {
    var xhr = getXHR(); // (1)

    xhr.open('POST', url, true); // (2)

    xhr.onreadystatechange = function() { // (3)
        if (xhr.readyState != 4) return; // (3.1)
        if (xhr.status != 200) {
            if (xhr.status == 404) {
                alert("Ошибка: " + xhr.status + " " + xhr.statusText + "неправильный url");
            }
        }
        var data = JSON.parse(xhr.responseText);

        insertTree(outputElem, data);

        data = null;

    };

    xhr.send(null); // (4)
}

/**
 * Insert tree
 * @param {object} outputParent - element, where you insert data
 * @param {object} dataJson - array of data
 */
function insertTree(outputParent, dataJson) {
    outputParent.appendChild(createJsonTree(dataJson));
}

/**
 * Create tree( ul list) from array
 * @param {object} objData - array of data
 */
function createJsonTree(objData) {
    var i, length = objData.length;

    if (isChild(objData)) return;

    var ul = createElem('ul');

    for (i = 0; i < length; i++) {
        if (i in objData) {

            var li = createElem('li');
            if (objData[i].dropmenu) {
                var toggleDiv = createElem('div');

                addClass(toggleDiv, 'toggleDiv');
                addClass(li, 'nodeClose');

                // li.setAttribute('child', 'has');
                li.appendChild(toggleDiv);
            }

            var content = createElem('div');
            addClass(content, 'content');
            var text = createElem('span');

            text.innerHTML = objData[i].NAMEGROUP;
            content.appendChild(text);

            li.appendChild(content);
            li.id = objData[i].GROUPID;


            var childUl = createJsonTree(objData[i].dropmenu);
            if (childUl) li.appendChild(childUl);

            ul.appendChild(li);


        }
    }
    return ul;
}