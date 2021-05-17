import { topLevelFrameBlocks } from '../data/variables';

function renderSemanticBlock(block) {
  return `<${block}></${block}>`;
}

let topLevelFrameString = topLevelFrameBlocks.reduce(
  (renderString, item) => (renderString += renderSemanticBlock(item)),
  '',
);

document.body.insertAdjacentHTML('afterbegin', topLevelFrameString);
