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
		 sidePanelWidth: 250,
		 sidePanelmaxDrag: 350,
		 
		 
			 
        sidePanel: Ext.create('SlideNavigationExample.view.Main2'),
		/*Ext.create('Ext.Panel', {
            config: {
				id: 'arne3',
				layout: 'card',
				scroll: 'auto',
				items: [
					{
						xtype: 'toolbar',
						docked: 'top'
					}
				]
			}
		}),*/
        container: Ext.create('Ext.Panel', {
			 items: [
				{
					xtype: 'toolbar',
					title: 'Item 1',
					docked: 'top'
				},
				{
					html: 'test1s'
				}
			]
		}),
		
        
        items: [
			
        ]
    }
});