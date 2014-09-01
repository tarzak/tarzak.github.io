/**
 * Created by Home on 31.08.2014.
 */
/*Ext.define('fontello', {
    singleton: true,

    DEFAULT_FONT_FAMILY: 'fontello',

    cw: 0xe800
});*/

Ext.onReady(function(){
    Ext.setGlyphFontFamily('fontello');
    var constrainedWin, constrainedWin2;

    var panel = Ext.create('Ext.panel.Panel', {
        //title : 'Третя панель',
        /*width : 1000,
        height: 600,*/
        layout : 'border',
        defaults : {
            padding: '3',
            //collapsible: true,
            split: true
        },
        items  : [{
            xtype : 'panel',
            region: 'center',
            //title : 'Вложенная центр',
            //html  : 'контент контент контент ',
            tbar: [
                { xtype: 'button', text: 'Button 1' }
            ]
        },{
            xtype : 'panel',
            region: 'south',
            title : 'Вложенная south',
            html  : 'контент контент контент ',
            tbar: [
                { xtype: 'button', text: 'Button 4' }
            ],
            bbar: [
                { xtype: 'button', text: 'Button 5' }
            ]
        },{
            xtype : 'panel',
            region: 'south',
            height: 100,
            title : 'Панель'
        }]
    });

    var tbMenu = Ext.create('Ext.toolbar.Toolbar', {
        items: [{ xtype:'button',
            text: 'Edit',
            menu: [{text: 'Cut'}, {text: 'Copy'}, {text: 'Paste'}]
        },{ xtype:'button',
            text: 'View',
            menu: [{text: '1'}, {text: '2'}, {text: '3'}]
        },{ xtype:'button',
            text: 'Tools',
            menu: [{text: 'Translate'}]
        },{ xtype:'button',
            text: 'Help',
            menu: [{text: 'Register'}, {text: 'Check for update'}, {text: 'About'}]
        }]
    });

    var tbTranslate = Ext.create('Ext.toolbar.Toolbar', {
        items: [{
            //the width of this field in the HBox layout is set directly
            //the other 2 items are given flex: 1, so will share the rest of the space
            width:          150,

            xtype:          'combo',
            queryMode:      'local',
            value:          'en',
            triggerAction:  'all',
            forceSelection: true,
            editable:       false,
            name:           'title',
            displayField:   'name',
            valueField:     'value',
            store:          Ext.create('Ext.data.Store', {
                fields : ['name', 'value'],
                data   : [
                    {name : 'English',   value: 'en'},
                    {name : 'Russian',  value: 'ru'},
                    {name : 'Ukrainian', value: 'ua'}
                ]
            })
        },{
            glyph: 0xe800,
            xtype: 'button',
            cls: 'refreshBtn'
        },{
            //the width of this field in the HBox layout is set directly
            //the other 2 items are given flex: 1, so will share the rest of the space
            width:          150,

            xtype:          'combo',
            queryMode:      'local',
            value:          'ua',
            triggerAction:  'all',
            forceSelection: true,
            editable:       false,
            name:           'title',
            displayField:   'name',
            valueField:     'value',
            store:          Ext.create('Ext.data.Store', {
                fields : ['name', 'value'],
                data   : [
                    {name : 'English',   value: 'en'},
                    {name : 'Russian',  value: 'ru'},
                    {name : 'Ukrainian', value: 'ua'}
                ]
            })
        }]
    });

    var tbBtns = Ext.create('Ext.toolbar.Toolbar', {
        items: [{ glyph: 0xe801, xtype: 'button', enableToggle: true },
                { glyph: 0xe802, xtype: 'button', enableToggle: true },
                { glyph: 0xe803, xtype: 'button', enableToggle: true },
                { glyph: 0xe804, xtype: 'button', enableToggle: true },
                { glyph: 0xe805, xtype: 'button', enableToggle: true },
                { glyph: 0xe806, xtype: 'button', enableToggle: true },
                { glyph: 0xe807, xtype: 'button', enableToggle: true }]
    });

    /*var store = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true,

            children: [
                { text: "detention", leaf: true},
                { text: "book report", leaf: true },
                { text: "algebra", leaf: true},
                { text: "buy lottery tickets", leaf: true }
            ]
        }
    });

    var tree = Ext.create('Ext.tree.Panel', {
        colspan: 2,
        height: 100,
        store: store,
        rootVisible: false,
        lines: false
    });*/

    var myData = [
                ['Cat'],
                ['Crowd'],
                ['Bush'],
                ['George'],
                ['Table'],
                ['Tree'],
                ['Horn'],
                ['Light'],
                ['Night'],
                ['Day'],
                ['Month'],
                ['Animal'],
                ['Cat'],
                ['Crowd'],
                ['Bush'],
                ['George'],
                ['Table'],
                ['Tree'],
                ['Horn'],
                ['Light'],
                ['Night'],
                ['Day'],
                ['Word'],
                ['X-ray']

                 ];

    var fields = [
                   {name: 'word'}

                 ];

    var store = Ext.create('Ext.data.ArrayStore', {
                fields: fields,  // указали массив индексов полей.
                data: myData     // указали откуда брать данные
                });

    var col =  [
                    {
                            text: 'Word',       // заголовок колонки
                        dataIndex: 'word',  // индекс поля из хранилища (fields)
                        width:365
                }
        ];

    var grid = Ext.create('Ext.grid.Panel', {
                layout:'fit',
                store: store,               // определили хранилище
                title: false,        // Заголовок
                columns:col,                 // указали массив колонок
                height: 300,
                hideHeaders:true,
                rowLines: false,
                cls: 'custom-grid'

        });

    var tbSearchInput = Ext.create('Ext.toolbar.Toolbar', {
        layout: 'anchor',
        items: [{xtype: 'textfield', anchor: '100%'}]
    });

    var tbBigBtns = Ext.create('Ext.toolbar.Toolbar', {
        //layout: 'anchor',
        items: [{ icon: 'https://cdn2.iconfinder.com/data/icons/lightly-icons/30/home-30.png', xtype: 'button', scale:'large' },
            { icon: 'https://cdn3.iconfinder.com/data/icons/lightly-icons/30/measure-30.png', xtype: 'button', scale:'large' },
            { icon: 'https://cdn3.iconfinder.com/data/icons/lightly-icons/30/652837-mail-send-30.png', xtype: 'button', scale:'large' },
            { icon: 'https://cdn2.iconfinder.com/data/icons/lightly-icons/30/mail-forward-30.png', xtype: 'button', scale:'large' },
            { icon: 'https://cdn1.iconfinder.com/data/icons/lightly-pro/30/share-unselected.png', xtype: 'button', scale:'large' },
            { icon: 'https://learningnetwork.cisco.com/themes/cisco_cln/resources/images/jive-icon-groups-30x30.png', xtype: 'button', scale:'large' },
            { icon: 'https://cdn2.iconfinder.com/data/icons/lightly-icons/30/settings-30.png', xtype: 'button', scale:'large'  }]
    });

    var win = Ext.create('widget.window', {
        //height: 600,
        width: 400,
        x: 800,
        y: 100,
        title: 'ABBYY Lingvo',
        closable: true,
        plain: true,
        //layout: 'fit',
        items: [tbMenu,
                tbTranslate,
                tbBtns,
                //tree,
                grid,
                tbSearchInput,
            tbBigBtns,
                constrainedWin2 = Ext.create('Ext.Window', {
            title: 'Header-Constrained Win',
            width: 200,
            height: 100,
            x: 120,
            y: 120,
            constrainHeader: true,
            layout: 'fit',
            items: {
                border: false
            }
        }),{
            border: false
        }]
    });
    win.show();

    /*constrainedWin.show();
    constrainedWin2.show();*/

});

