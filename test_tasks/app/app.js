UD = {};

UD.FormView = function (model, rootObject) {
    var that = this;

    this.init = function () {
        that.formBody = $('<form/>').appendTo($('<div class=form/>').appendTo(rootObject));

        that.userName = $('<input name=user-name />').appendTo($('<label>User name: </label>').appendTo(that.formBody));
        that.phoneNumber = $('<input name=phone-number />').appendTo($('<label>Phone number: </label>').appendTo(that.formBody));
        that.email = $('<input name=email type=email />').appendTo($('<label>Email: </label>').appendTo(that.formBody));
        that.url = $('<input name=homepage type=url />').appendTo($('<label>Homepage: </label>').appendTo(that.formBody));
        that.submitBtn = $('<input type=submit />').appendTo(that.formBody);
        
        that.formBody = that.formBody[0];
    };

    this.getData = function () {
        var userObject = {};
        userObject.userName = that.userName.val();
        userObject.phoneNumber = that.phoneNumber.val();
        userObject.email = that.email.val();
        userObject.url = that.url.val();

        return userObject;
    };
};

UD.TableView = function (model, rootObject) {
    var that = this;

    this.init = function () {
        var columns = ['Name', 'Phone number', 'Email', 'Homepage'],
            _table,
            _tableHeaderRow;

        _table = $('<table />').appendTo($('<div class=table/>').appendTo(rootObject));

        _tableHeaderRow = $('<tr />').appendTo($('<thead />').appendTo(_table));

        columns.forEach(function (column) {
            $('<th>' + column + '</th>').appendTo(_tableHeaderRow);
        });

        that._tableBody = $('<tbody />').appendTo(_table);

        model.getUsers().forEach(function(user){
            that.addRow(user);
        })
    };
    this.addRow = function (user) {
        $('<tr><td>' + user.userName + '</td><td>' +
            user.phoneNumber + '</td><td>' +
            user.email + '</td><td>' + 
            user.url + '</td></tr>').appendTo(that._tableBody);
    };

    model.modelChangedSubject.addObserver(function (user) {
        that.addRow(user);
    });
};

UD.Model = function () {
    var that  = this,
        users = [];

    this.modelChangedSubject = UD.makeObservableSubject();

    this.addUser = function (value) {
        if (!value) {
            return;
        }

        value.id = guid();
        users.push(value);
        that.modelChangedSubject.notifyObservers(value);
    };

    this.getUsers = function () {
        return users;
    };

    function guid () {
      var blank = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

      return blank.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0
          , v = c == 'x' ? r : r & 0x3 | 0x8;

        return v.toString(16);
      });
    };
};

UD.Controller = function (model, formView, tableView) {
    formView.formBody.onsubmit = function (e) {
        var user = formView.getData();
        e.preventDefault();
        model.addUser(user);
    };
};

UD.makeObservableSubject = function () {
    var observers = [];
    var addObserver = function (o) {
        if (typeof o !== 'function') {
            throw new Error('observer must be a function');
        }
        for (var i = 0, ilen = observers.length; i < ilen; i += 1) {
            var observer = observers[i];
            if (observer === o) {
                throw new Error('observer already in the list');
            }
        }
        observers.push(o);
    };
    var removeObserver = function (o) {
        for (var i = 0, ilen = observers.length; i < ilen; i += 1) {
            var observer = observers[i];
            if (observer === o) {
                observers.splice(i, 1);
                return;
            }
        }
        throw new Error('could not find observer in list of observers');
    };
    var notifyObservers = function (data) {
        // Make a copy of observer list in case the list
        // is mutated during the notifications.
        var observersSnapshot = observers.slice(0);
        for (var i = 0, ilen = observersSnapshot.length; i < ilen; i += 1) {
            observersSnapshot[i](data);
        }
    };
    return {
        addObserver: addObserver,
        removeObserver: removeObserver,
        notifyObservers: notifyObservers,
        notify: notifyObservers
    };
};

$(document).ready(function () {
    var model = new UD.Model();
    model.addUser({userName:'Ivanov T.',phoneNumber:'555-4473',email:"Ivanov@gmail.com",url:'http://ivanov.com'});
    model.addUser({userName:'Perov V.',phoneNumber:'555-55-65',email:"Petrov@gmail.com",url:'http://petrov.com'});
    model.addUser({userName:'User 1',phoneNumber: '555-00-11',email:"user1@gmail.com",url:'http://userone.com'});
    model.addUser({userName:'User 2',phoneNumber:'555-00-22',email:"user2@gmail.com",url:'http://user2.com'});
    var formView = new UD.FormView(model, 'body');
    var tableView = new UD.TableView(model, 'body');

    formView.init();
    tableView.init();
    var controller = new UD.Controller(model, formView, tableView);
});