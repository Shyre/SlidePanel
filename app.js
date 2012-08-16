//<debug>
Ext.Loader.setPath({
    'Ext.ux': 'ux'
});
//</debug>

Ext.application({
    name: 'SlideNavigationExample',

    requires: [
        'Ext.MessageBox', 'SlideNavigationExample.view.Main2'
    ],

    views: [
        'Main', 'Main2'
    ],

    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },
    
    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

	viewport: {
        autoMaximize: true
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
		
		
		
		
		Ext.Viewport.add(Ext.create('SlideNavigationExample.view.Main'));
		//Ext.Viewport.add(pan1);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function() {
                window.location.reload();
            }
        );
    }
});
