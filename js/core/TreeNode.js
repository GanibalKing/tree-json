function TreeNode(node) {
    Node.apply(this, arguments);
}

extend(TreeNode, Node);

TreeNode.prototype.openNode = function() {
    this._node.className = "nodeOpen";
};

TreeNode.prototype.closeNode = function() {
    this._node.className = "nodeClose";
};
