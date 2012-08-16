/*Ext.define("SlideNavigationExample.view.Main2", {
	extend: 'Ext.Container',
	xtype: 'mainpanel',
	requires: [
		'Ext.List', 'Ext.data.Store'
	],
		config: 
		{
			//
			
			items: [
			{
				xtype: 'toolbar',
				id: 'toolbar',
				title: 'add'
			},
			{
				xtype: 'list',
				itemTpl: '{title}',
				data: [
					{ title: 'Item 1' },
					{ title: 'Item 2' },
					{ title: 'Item 3' },
					{ title: 'Item 4' }
				]
			}
		]
	}		
});
*/
Ext.define('SlideNavigationExample.view.Main2', {
    extend: 'Ext.Panel',
    xtype: 'mainlist',
    requires: ['Ext.List','Ext.data.Store'],

    config: 
	{
		layout: 'vbox',
        items: [{
			height: 50,
			html: 'gfgf'
		},
		{
			flex: 1,
			xtype: 'list',
			itemTpl: '{title}',
			data: [
					{ title: 'Item 1' },
					{ title: 'Item 2' },
					{ title: 'Item 3' },
					{ title: 'Item 4' }
				]
		}
		]
    }

});