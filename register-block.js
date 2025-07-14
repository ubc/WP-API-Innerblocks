export const register_cloned_blocks = ( blockType, name ) => {
    // If the localized object does not exist, do nothing.
    if ( ! ubc_wp_api_inner_blocks.blocks ) {
        return blockType;
    }

    // Let's find and see if current block type is one of the core inner blocks. If not, exit.
    let coreInnerBlock = Object.keys( ubc_wp_api_inner_blocks.blocks ).filter( ( block ) => ubc_wp_api_inner_blocks.blocks[block].name === name );
    if ( coreInnerBlock.length === 0 ) {
        return blockType;
    }

    // Get the core innerblock name and all the new blocks that will be created based on it.
    coreInnerBlock = coreInnerBlock[0];
    const blocksToCreate = ubc_wp_api_inner_blocks.blocks[coreInnerBlock].blocks;

    blocksToCreate.forEach((newBlockName) => {
        wp.blocks.registerBlockType( newBlockName, {
            icon: blockType.icon,
            edit: blockType.edit,
            save: blockType.save,
        } );
    });

    return blockType;
};

wp.hooks.addFilter(
    'blocks.registerBlockType',
    'ubc/wp-api-inner-blocks/register',
    register_cloned_blocks
);