Ext.define("SlideNavigationExample.view.Main", {
    extend: 'Ext.ux.slidenavigation.View',
    
    requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.event.publisher.Dom'
    ],
    
    config: {         
        /**
         *  Any component within the container with an 'x-toolbar' class
         *  will be draggable.  To disable draggin all together, set this
         *  to false.
         */
        slideSelector: 'x-toolbar',
        
        /**
         *  Time in milliseconds to animate the closing of the container
         *  after an item has been clicked on in the list.
         */
        selectSlideDuration: 200,
         
        /**
         *  This allows us to configure how the actual list container
         *  looks.  Here we've added a custom search field and have
         *  modified the width.
         */
        list: {
            maxDrag: 250,
            width: 200,
            html: 'hello'
            
        },
        
        
        items: [
			{
				
				
				
				/**
				 *  Here's an example of how we can add a button into
				 *  particular location.  In this case, it'll be added into the
				 *  item's toolbar.
				 */
				
				items: [{
					xtype: 'toolbar',
					title: 'Item 1',
					docked: 'top'
				}]
			}
        ]
    }
});