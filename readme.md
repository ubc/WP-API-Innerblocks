# UBC WP API Inner Blocks
Contributors:      Kelvin Xu
Tags:              block
Tested up to:      6.5
Stable tag:        2.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html


## Description
Provide inner blocks that consumes data from external API. The inner blocks receives context from the main block(eg, UBC Course Section Block), and render contents accordingly.

## ChangeLog
2.0.0 - Broken change introduced. It will only work with WP RSS Block 2.x. Reworked the plugin so that instead of using the resources innerblocks directly by the parent blocks. The parent block can now create their own specific blocks based on existing resource innerblocks.

![](https://kelvinxu.sites.olt.ubc.ca/files/2024/07/innerblocks-context-hierachy-diagram.jpg)

