/**
 * Created by Home on 29.08.2014.
 */
/*Ext.application({
    name:'MyApp',
    launch:function(){
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{
                title: 'Hello, EXTJS!',
                html:'Hello, new ExtJs Dev.'
            }]
        });
    }
});*/

Ext.onReady(function(){
    // Метод alert из пакета Ext.Msg равносилен стандарной JS функции alert();,
    // первый параметр - это загаловок, второй сам текст

    //Ext.Msg.alert('Загаловок','Hello World');

    /*
    var panel = Ext.create('Ext.panel.Panel', {
        title : 'Перша панель',
        width : 600,
        height: 300,
        html  : " <input type ='checkbox'> <br> <input type ='checkbox'> Контент Контент Контент Контент Контент ",
        renderTo : 'test'
    });

    var panel2 = Ext.create('Ext.panel.Panel', {
        title : 'Друга панель',
        width : 98,
        height: 98,
        html  : " <input type ='checkbox'> <br> <input type ='checkbox'> Контент Контент Контент Контент Контент ",
        renderTo : 'test2'
    });

     ,
     lbar: [
     { xtype: 'button', text: 'Button 1' }
     ]
    */
    var buttonForm = Ext.create('Ext.button.Button', {
        text: 'Отправить',
        handler : function (){
            Ext.Msg.alert('Внимания','Нажата кнопка buttonForm');
        }
    });

    var myForm = Ext.create('Ext.form.Panel', {
        id: 'idForm',
        region: 'center',
        title: 'Тестовая форма',
        fieldDefaults: {
            msgTarget: 'side'
        },
        defaults: {
            anchor: '100%'
        },

        defaultType: 'textfield',
        bodyPadding: '5 5 0',
        items: [{
            fieldLabel: 'Имя',
            name: 'first',
            allowBlank: false
        }, {
            fieldLabel: 'Email',
            name: 'email',
            vtype:'email'
        }, {
            fieldLabel: 'Дата',
            name: 'dob',
            xtype: 'datefield'
        }, {
            fieldLabel: 'Сколько лет',
            name: 'age',
            xtype: 'numberfield',
            minValue: 0,
            maxValue: 100
        }, {
            xtype: 'timefield',
            fieldLabel: 'Время',
            name: 'time',
            minValue: '8:00am',
            maxValue: '6:00pm'
        }, {
            xtype: 'htmleditor',
            name: 'text',
            fieldLabel: 'Текст'
        }],

        //buttons: [buttonForm]
        buttons: [{
            text: 'Save',
            handler: function() {
                this.up('form').getForm().isValid();
            }
        },{
            text: 'Cancel',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }, buttonForm]
    });


    var panel3 = Ext.create('Ext.panel.Panel', {
        title : 'Третя панель',
        width : 1000,
        height: 600,
        renderTo : 'test3',
        layout : 'border',
        defaults : {
            padding: '3',
            collapsible: true,
            split: true
        },
        items  : [/*{
            xtype : 'panel',
            region: 'center',
            title : 'Вложенная центр',
            html  : 'контент контент контент ',
            rbar: [
                { xtype: 'button', text: 'Button 1', handler : pressedBtn }
            ]
        },*/myForm,{
            xtype : 'panel',
            region: 'east',
            title : 'Вложенная центр',
            html  : 'контент контент контент '
        },{
            xtype : 'panel',
            region: 'south',
            title : 'Вложенная south',
            html  : 'контент контент контент ',
            tbar: [
                { xtype: 'button', text: 'Button 4', handler : pressedBtn }
            ],
            bbar: [
                { xtype: 'button', text: 'Button 5', handler : pressedBtn }
            ]
        },{
            xtype : 'tabpanel',
            region: 'south',
            height: 200,
            title : 'Таб панель',
            items : [{
                title : 'Первая вкладка',
                html  : 'Контент первой вкладки',
                items  : [{ xtype : 'button', text : 'Button' }]
            },{
                title : 'Вторая вкладка',
                html  : 'Контент второй вкладки <img src = "http://mafia.ua/static/img/logo_ru.png">'
            }]
        }]
    });

});
function pressedBtn(){
    Ext.Msg.alert('Внимания','Нажата кнопка ' + this.text);
}

