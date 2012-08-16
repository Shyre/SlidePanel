/**
 *  {@link Ext.ux.slidenavigation.View} is a subclass of {@link Ext.Container}
 *  that provides a sliding main view with an underlying navigation list.  The
 *  concept was inspired by Facebook's mobile app.
 *
 *  @author Weston Nielson <wnielson@github>
 */
Ext.define('Ext.ux.slidenavigation.View', {
    extend: 'Ext.Container',
    
    requires: [
        'Ext.Button',
        'Ext.Container',
        'Ext.Function',
        'Ext.ModelManager',
        'Ext.Toolbar',
        'Ext.data.Model',
        'Ext.data.Store',
        'Ext.List',
    ],
    
    xtype: 'slidenavigationview',
    
    config: {
        /**
         * @cfg {Object} list Configuration for the navigation list
         */
        		
		sidePanel: {},
		
		sidePanelWidth: 200,
		sidePanelmaxDrag: 250,
        
        /**
         * @cfg {Object} container Configuration for the container
         */
        container: {},

        /**
         * @cfg {Array} items An array of items to put into the navigation list.
         * The items can either be Ext components or special objects with a "handler"
         * key, which should be a function to execute when selected.  Additionally, you
         * can define the order of the items by defining an 'order' parameter.
         */        
        //items: [],
        
        /**
         * @cfg {Object} groups Mapping of group name to order.  For example,
         * say you have defined two groups; "Group 1" and "Group 2".  By default
         * these will be presented in the list in that order, since
         * 'Group 1' > 'Group 2'.  This option allows you to change the ordering,
         * like so:
         *
         *  groups: {
         *    'Group 1': 2
         *    'Group 2': 1
         *  }
         *
         *  You should use integers, starting with 1, as the ordering value.
         *  By default groups are ordered by their name.
         */
        //groups: {},
        
        /**
         * @cfg {Object} defaults An object of default values to apply to any Ext
         * components created from those listed in ``items``.
         */
        defaults: {
			layout: 'card'
        },
        
        /**
         * @cfg {String} slideSelector Class selector of object (or parent)
         * of which dragging should be allowed.  Defaults to the entire container.
         * For example, this could be set to something like 'x-toolbar' to restrict
         * dragging only to a toolbar.
         */
        slideSelector: '',
        
        /**
         * @cfg {Integer} slideDuration Number of miliseconds to animate the sliding
         * of the container when "flicked".  By default the animation is disable on
         * Android.
         */
        slideDuration: Ext.os.is.Android ? 0 : 100,
        
        /**
         * @cfg {Integer} selectSlideDuration Number of miliseconds to animate the sliding
         * of the container when list item is selected (if closeOnSelect = true). The default
         * value here of 300 gives a much nicer feel.  By default the animation is disable on
         * Android.
         */
        selectSlideDuration: Ext.os.is.Android ? 0 : 300,
        
        /**
         * @cfg {Boolean} closeOnSelect Whether or not to automatically close the container
         * when an item in the list is selected.  Default is true.
         */
        closeOnSelect: true
    },
        
    initConfig: function() {
        var me = this;
        
        
        me.callParent(arguments);
        
        me.slideButtonDefaults = {
            xtype: 'button',
            iconMask: true,
            iconCls: 'more',
            name: 'slidebutton',
            listeners: {
                release: me.toggleContainer,
                scope: me
            },
            /**
             *  To add the button into a toolbar, you can add the following
             *  to any item in your navigation list.
             */
            //selector: ['toolbar']
        };
        
        
        return me.callParent(arguments);
    },
            
    initialize: function() {
        this.callParent();
        
        this.addCls('x-slidenavigation');
        
        //Create holder containers
		this.sidePanel = this.createSidePanel();
        this.container = this.createContainer();
		
		
		
		// Puts your panels in the holder panels
		this.sidePanel.add(this.getSidePanel());
		this.container.add(this.getContainer());
        
        this.add([
            this.sidePanel,
            this.container
        ]);
        
        // TODO: Make this optional, perhaps by defining
        // "selected: true" in the items list
        //this.list.select(0);
    },
    
    
    
    /**
     *  Creates a button that can toggle the navigation menu.  For an example
     *  config, see ``slideButtonDefaults``.
     */
    createSlideButton: function(el, config) {
        var me = this,
            parent = el.down(config.selector);
        
        if (parent) {
            return parent.add(Ext.merge(me.slideButtonDefaults, config));
        }
        
        return false;
    },
    
    onContainerDragstart: function(draggable, e, offset, eOpts) {
        if (this.config.slideSelector == false) {
            return false;
        }
        
        if (this.config.slideSelector) {
            node = e.target;
            while (node = node.parentNode) {
                if (node.className && node.className.indexOf(this.config.slideSelector) > -1) {
                    return true;
                }
            }
            return false;
        }
        return false;
    },
    
    onContainerDragend: function(draggable, e, eOpts) {
        var velocity  = Math.abs(e.deltaX / e.deltaTime),
            direction = (e.deltaX > 0) ? "right" : "left",
            offset    = Ext.clone(draggable.offset),
            threshold = parseInt(this.config.sidePanelWidth * .70);
        
        switch (direction) {
            case "right":
                offset.x = (velocity > 0.75 || offset.x > threshold) ? this.config.sidePanelWidth : 0;
                break;
            case "left":
                offset.x = (velocity > 0.75 || offset.x < threshold) ? 0 : this.config.sidePanelWidth;
                break;
        }
        
        this.moveContainer(offset.x);
    },
    
       
    /**
     *  Closes the container.  See ``moveContainer`` for more details.
     */
    closeContainer: function(duration) {
        var duration = duration || this.getSlideDuration();
        this.moveContainer(0, duration);
    },
    
    /**
     *  Opens the container.  See ``moveContainer`` for more details.
     */
    openContainer: function(duration) {
        var duration = duration || this.config.slideDuration;
        this.container.addCls('open');
        this.moveContainer(this.config.sidePanelWidth, duration);
    },
    
    toggleContainer: function(duration) {
        var duration = Ext.isNumber(duration) ? duration : this.getSlideDuration();
        if (this.isClosed()) {
            this.openContainer(duration);
        } else {
            this.closeContainer(duration);
        }
    },
    
    /**
     *  Moves the container to a specified ``offsetX`` pixels.  Positive
     *  integer values move the container that many pixels from the left edge
     *  of the window.  If ``duration`` is provided, it should be an integer
     *  number of milliseconds to animate the slide effect.  If no duration is
     *  provided, the default in ``config.slideDuration`` is used.
     */
    moveContainer: function(offsetX, duration) {
        var duration = duration || this.getSlideDuration(),
            draggable = this.container.draggableBehavior.draggable;
        
        draggable.setOffset(offsetX, 0, {
            duration: duration
        });
    },
    
    /**
     *  Returns true if the container is closed, false otherwise.  This is a
     *  computed value based off the current offset position of the container.
     */
    isClosed: function() {
        return (this.container.draggableBehavior.draggable.offset.x == 0);
    },
    
    /**
     *  Sets the container as being closed.  This shouldn't ever be called
     *  directly as it is automatically called by the ``translatable``
     *  "animationend" event after the container has stopped moving.  All this
     *  really does is set the CSS class for the container.
     */
    setClosed: function(closed) {
        /**
         *  TODO: Consider some way to mask/disable certain elements when
         *        the container is opened.  The code commented-out below
         *        'works' but I think there is a better way to approach this.
         */
         
        if (closed) {
            this.container.removeCls('open');
            
            /*
            Ext.each(this.container.getActiveItem().getItems().items, function(item) {
                if (item.maskOnSlide) {
                    item.setMasked(false);
                }
            });
            */
        } else {
            this.container.addCls('open');
            /*
            Ext.each(this.container.getActiveItem().getItems().items, function(item) {
                if (item.maskOnSlide) {
                    item.setMasked(true);
                }
            });
            */
        }
    },
    
    /**
     * Generates a new Ext.dataview.List object to be used for displaying
     * the navigation items.
     */
    createSidePanel: function() {
        return Ext.create('Ext.Panel', {
            //store: this.store,
			width: this.config.sidePanelWidth,
            docked: 'left',
            cls: 'x-slidenavigation-container',
			style: 'width: 100%; height: 100%; position: absolute; opacity: 1; z-index: 5',
			layout: 'card',
            listeners: {
                //select: this.onSelect,
                scope: this
            }
        });
    },
    
    /**
     *  Generates and returns the Ext.Container to be used for displaying
     *  content.  This is the "slideable" container that is positioned above
     *  the navigation list.
     */
    createContainer: function() {        
		return Ext.create('Ext.Panel', {
            docked: 'left',
            cls: 'x-slidenavigation-container',
            style: 'width: 100%; height: 100%; position: absolute; opacity: 1; z-index: 5',
            docked: 'left',
            layout: 'card',
            draggable: {
                direction: 'horizontal',
                constraint: {
                    min: { x: 0, y: 0 },
                    max: { x: this.config.sidePanelmaxDrag || Math.max(screen.width, screen.height), y: 0 }
                },
                listeners: {
                    dragstart: {
                        fn: this.onContainerDragstart,
                        order: 'before',
                        scope: this
                    },
                    //drag: Ext.Function.createThrottled(this.onContainerDrag, 100, this),
                    dragend: this.onContainerDragend,
                    scope: this
                },
                translatable: {
                    listeners: {
                        animationend: function(translatable, b, c) {
                            // Remove the class when the animation is finished, but only
                            // if we're "closed"
                            this.setClosed(this.isClosed());
                        },
                        scope: this // The "x-slidenavigation" container
                    }
                }
            }
        });
    }
});