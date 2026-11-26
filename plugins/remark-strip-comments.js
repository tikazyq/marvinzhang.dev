function isCommentNode(node) {
  if (node.type === 'mdxFlowExpression' || node.type === 'mdxTextExpression') {
    return /^\s*\/\*[\s\S]*\*\/\s*$/.test(node.value ?? '');
  }

  if (node.type === 'html') {
    return /^\s*<!--[\s\S]*-->\s*$/.test(node.value ?? '');
  }

  return false;
}

function removeComments(tree) {
  if (!Array.isArray(tree.children)) {
    return;
  }

  tree.children = tree.children.filter((node) => !isCommentNode(node));
  tree.children.forEach(removeComments);
}

export default function remarkStripComments() {
  return removeComments;
}
