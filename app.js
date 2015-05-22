(function() {
    function init() {

        // left block
        var container = getId('treeWrapper');
        var menuButtons = getId("menuButtons");
        var create = getElem("#create");
        var createList = getElem(".createButtonsList");
        var color;

        // right block
        var right = getId("right");
        var mainPcotocol = getId('mainProtocol');

       

        var oldLeaf, newLeaf;


        var Tree = new ChildTree(container);
        var protocol = new TreeProtocol(mainPcotocol);

        Tree.getTree("data/tree.json");

        protocol.getProtocol();

        // cancel backspace on document handler
        function onDocumentKeyDown(e) {
            e = fixEvent(e);

            var target = e.target;

            if (e.keyCode == 8) {
                if (target.tagName != "INPUT") {
                    return false;
                }
            }
        }


        /**
         * Add color to current target elem
         * @param{object} - leaf - current target elem
         */
        function addColor(leaf) {
            if (color) {
                removeClass(color, "active");
            }
            color = leaf;
            addClass(color, "active");
        }

        // close default dblclick event handler
        function onDbCklick(e) {
            return false;
        }

        // focus blur handler
        function inputBlur(e) {
            e = fixEvent(e);

            var target = e.target;

            var leaf = new TreeLeaf(target);

            newLeaf = leaf.getName();

            leaf.setName();

            protocol.addRenameLog(oldLeaf, newLeaf);

            newLeaf = oldLeaf = null;
            leaf = null;

        }

        // enter key handler
        function onKeyDown(e) {

            e = fixEvent(e);

            var target = e.target;

            if (e.keyCode == 13) {

                var leaf = new TreeLeaf(target);

                leaf.setName();

                newLeaf = leaf.getName();

                protocol.addRenameLog(oldLeaf, newLeaf);

                newLeaf = oldLeaf = null;
                leaf = null;
            }
        }

        // input value length control handler
        function onKeyPress(e) {
            e = fixEvent(e);

            var target = e.target;

            if (target.value.length > 15) {
                target.value = target.value.substr(0, 30);
            }
        }


        // open / close node and choose element handler
        function onTreeClick(e) {

            e = fixEvent(e);

            var target = e.target;

            var node;
            var newNode;

            if (target && target.className == "toggleDiv") {

                node = target.parentNode;

                newNode = new TreeNode(node);

                node.className == "nodeClose" ? newNode.openNode() : newNode.closeNode();
                newNode = null;
                node = null;

            } else if (target && target.tagName == "SPAN") {

                if (target && hasClass(target.parentNode.parentNode.firstChild, "toggleDiv") === true) {
                    node = target.parentNode.parentNode;

                    newNode = new TreeNode(node);

                    node.className == "nodeOpen" ? newNode.closeNode() : newNode.openNode();

                    newNode = null;
                    node = null;
                }

                addColor(target);


            } else {
                return;
            }
        }

        // dblclick on element tree handler
        function onTreeDblClick(e) {
            e = fixEvent(e);

            var target = e.target;
            if (target && target.tagName == "SPAN") {

                var leaf = new TreeLeaf(target);

                leaf.rename();
                oldLeaf = leaf.getName();

                leaf = null;

                var input = getElem("input", container);

                if (input === null) return;

                addEvent(input, "keydown", onKeyDown);
                addEvent(input, "blur", inputBlur);
                addEvent(input, "keypress", onKeyPress);

            }

        }

        // open / close create menu handler
        function showMenuCreate() {

            if (hasClass(createList, "open") == true) {
                removeClass(createList, "open");
            } else {
                addClass(createList, "open");
            }
        }

        // click on item(button) menu handler
        function menuButtonsClick(e) {

            e = fixEvent(e);

            var target = e.target;

            var id = target.getAttribute('id');

            var activeLeaf = getElem(".active", container);

            if (activeLeaf !== null) {
                var leaf = new TreeLeaf(activeLeaf);

                switch (id) {
                    case "rename":
                        oldLeaf = leaf.getName();
                        leaf.rename();
                        removeClass(activeLeaf, "active");
                        removeClass(createList, "open");
                        break;
                    case "delete":
                        var deleteItem = leaf.getName();
                        leaf.deleteLeaf();
                        protocol.addDeleteLog(deleteItem);
                        removeClass(createList, "open");
                        break;
                    case "createBefore":
                        leaf.insertBeforeLeaf();
                        removeClass(activeLeaf, "active");
                        removeClass(createList, "open");
                        break;
                    case "createAfter":
                        leaf.insertAfterLeaf();
                        removeClass(activeLeaf, "active");
                        removeClass(createList, "open");
                        break;
                    case "createFirst":
                        leaf.insertLeafFirst();
                        removeClass(activeLeaf, "active");
                        removeClass(createList, "open");
                        break;
                    case "createLast":
                        leaf.insertLeafLast();
                        removeClass(activeLeaf, "active");
                        removeClass(createList, "open");
                        break;
                    case "createNode":
                        leaf.createNode(container);
                        removeClass(activeLeaf, "active");
                        removeClass(createList, "open");
                        break;
                    case "saveTree":
                        protocol.setProtocol();
                        Tree.setTree();
                        break;
                    case "reset":
                        Tree.clearTree();
                        protocol.clearProtocol();
                        break;
                }

                deleteItem = null;
                leaf = null;

            } else {
                if (container.childNodes.length === 0) {

                    if (id === "createNode") {

                        Tree.createLeaf();
                    }
                } else if (id === "saveTree") {

                    Tree.setTree();

                    protocol.setProtocol();

                } else if (id === "reset") {
                    Tree.clearTree();
                    protocol.clearProtocol();
                }
            }

            var input = getElem("input", container);

            if (input === null) return;

            addEvent(input, "keydown", onKeyDown);
            addEvent(input, "blur", inputBlur);
            addEvent(input, "keypress", onKeyPress);

        }



        // handlers
        addEvent(document.body, "keydown", onDocumentKeyDown);

        addEvent(container, "dblclick", onDbCklick);
        addEvent(container, "click", makeDblClick(onTreeDblClick, onTreeClick));

        addEvent(create, "click", showMenuCreate);
        addEvent(menuButtons, "click", menuButtonsClick);


    }

    // stop drag and select element
    document.ondragstart = document.onselectstart = function() {
        return false;
    };

    // first load DOM, after work with tree
    var root = (window.addEventListener || window.attachEvent) ? window : (document.addEventListener) ? document : null;
    if (root) {
        if (root.addEventListener) root.addEventListener("load", init, false);
        else if (root.attachEvent) root.attachEvent("onload", init);
    }

})();