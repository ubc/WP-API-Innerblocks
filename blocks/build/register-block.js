/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./register-block.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   register_cloned_blocks: () => (/* binding */ register_cloned_blocks)
/* harmony export */ });
const register_cloned_blocks = (blockType, name) => {
  // If the localized object does not exist, do nothing.
  if (!ubc_wp_api_inner_blocks.blocks) {
    return blockType;
  }

  // Let's find and see if current block type is one of the core inner blocks. If not, exit.
  let coreInnerBlock = Object.keys(ubc_wp_api_inner_blocks.blocks).filter(block => ubc_wp_api_inner_blocks.blocks[block].name === name);
  if (coreInnerBlock.length === 0) {
    return blockType;
  }

  // Get the core innerblock name and all the new blocks that will be created based on it.
  coreInnerBlock = coreInnerBlock[0];
  const blocksToCreate = ubc_wp_api_inner_blocks.blocks[coreInnerBlock].blocks;
  blocksToCreate.forEach(newBlockName => {
    wp.blocks.registerBlockType(newBlockName, {
      icon: blockType.icon,
      edit: blockType.edit,
      save: blockType.save
    });
  });
  return blockType;
};
wp.hooks.addFilter('blocks.registerBlockType', 'ubc/wp-api-inner-blocks/register', register_cloned_blocks);
/******/ })()
;
//# sourceMappingURL=register-block.js.map