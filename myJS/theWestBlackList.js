onPlayerClick_: function (ev) {
    var playerId = $(ev.currentTarget).data('player-id'), player, clientId, isFriend, chatClient, isOffline, selectbox;
    
    if(playerId == Character.playerId) return;
    selectbox = new west.gui.Selectbox();
    if(playerId) {
        player = this.friendsBar.getPlayer(playerId), clientId = 'client_' + playerId, isFriend = Chat.Friendslist.isFriend(clientId), chatClient = Chat.Resource.Manager.getClient(clientId), isOffline =! chatClient || chatClient.statusId === Chat.Resource.Client.STATUS_OFFLINE;
        if(!player) return;
        selectbox.setHeader(player.name).addListener(this.onPlayerMenuClick_.bind(this,player)).addItem(0, "Посмотреть профиль");
        if(!isOffline) { selectbox.addItem(1, 'Шепнуть'); }
        electbox.addItem(2, 'Написать письмо').addItem(3, 'Показать на карте');
        if(isFriend) { 
            selectbox.addItem(4, 'Расторгнуть дружбу');
            this.addEventItems_(playerId,selectbox);
        }
        
        else {
            selectbox.addItem(5, 'Пригласить друга')
        }
    }
    
    else { 
        selectbox.setHeader('Новый друг').addListener(this.onPlayerInviteMenuClick_).addItem(0, 'Добавить друга').addItem(1,'Пригласить друга');
    }
    
    selectbox.show(ev);
}

addEventItems_: function (friendId, selectbox) {
    var eventName, ev, actionLabel, lastActivation, diff, img;
    for(eventName in Game.sesData) {
        ev = Game.sesData[eventName];
        if(!ev.friendsbar) continue;
        if(buildTimestamp(ev.meta.end, true) <= new ServerDate().getTime())continue;
        actionLabel = ev.friendsbar.label;
        lastActivation = this.friendsBar.getEventActivation(eventName, friendId);
        diff = lastActivation + parseInt(ev.friendsbar.cooldown, 10) - new ServerDate().getTime() / 1000;
        
        if(diff > 0) { 
            actionLabel += ' (' + diff.formatDurationBuffWay() + ')';
        }
        img = '<img class = "fbar-event-img" src = "http://westru.innogamescdn.com/images/interface/friendsbar/events/' + eventName + '.png" />';
        selectbox.addItem(eventName, img + actionLabel);
    }
}

onPlayerMenuClick_: function (player,id) { 
    var client,room; 
    switch(id) {
        
        case 0:
            PlayerProfileWindow.open(player.player_id);
            break;
        
        case 1:
            if(Chat.IgnoreButler.contains(player.name)) {
                new UserMessage("Ты игнорируешь этого игрока").show();
            }
            else {
                client = Chat.Resource.Manager.getClient('client_' + player.player_id);
                room = Chat.Resource.Manager.acquireRoom(client);
                if(room)room.openClick();
            }
            break;
        
        case 2:
            MessagesWindow.open('telegram', {insert_to:player.name});
            break;
        
        case 3:
            Map.center(player.x, player.y);
            break;
        
        case 4:
            FriendslistWindow.deleteFromFriendList(player.player_id);
            break;
        
        case 5:
            FriendslistWindow.inviteIngameFriend(player.name);
            break;
        
        default:
            if(Game.sesData[id]) {
                this.friendsBar.activateEvent(id, player.player_id);
            }
            break;
    }
}

onPlayerInviteMenuClick_: function (id) { 
    switch(id) { 
    
        case 0:
            FriendslistWindow.showAddDialog();
            break;
    
        case 1:
            FriendslistWindow.open();
            break;
    }
}

onActionClick_: function (e) { 
    var action = $(e.target).data('action');
    switch(action) { 
        
        case'add':
            FriendslistWindow.showAddDialog();
            break;
        
        case'invite':
            FriendslistWindow.open();
            break;
            
        case'search':
            var search;
            if((search = $('.fbar-search', this.dom)).length) { 
                search.animate({top:73}, function() {
                    search.remove();
                });
            } 
            else {
                search = new west.gui.Textfield().addClass('fbar-search').setPlaceholder('Искать [Enter]').addListener(function(val) {
                    this.friendsBar.setFilter('name',val||null);
                }, this).getMainDiv();
                this.dom.append(search);
                search.animate({top:43}, function() { 
                    $('input',search).focus();
                });
            }
            break;
            
        case'reset':
            this.friendsBar.setFilter('name',null);
            break;
    }
}

onMouseWheel_: function (e, delta) {
    if(delta<0) {
        this.friendsBar.next();
    }
    else {
        this.friendsBar.prev();
    }
}

onClientStatusChanged_: function (chatClient) {
    var currentPageChanged = this.friendsBar.refreshSort();
    if(currentPageChanged) { 
        this.show(this.friendsBar.getCurrentPlayers());
    }
    else if(this.isVisible(chatClient.playerId)) { 
        $('.fbar-player[data-player-id="' + chatClient.playerId + '"]').replaceWith(this.preparePlayerDom_(this.friendsBar.getPlayer(chatClient.playerId)));
    }
}

onFriendshipCancelled_: function (playerId) {
    if(this.friendsBar.getType() === 'friends' && this.friendsBar.hasPlayer(playerId)) {
        this.friendsBar.setSearchType('friends');
    }
}

onFriendshipAccepted_: function (chatClient) {
    if(this.friendsBar.getType() === 'friends'&&!this.friendsBar.hasPlayer(chatClient.playerId)) {
        this.friendsBar.setSearchType('friends');
    }
}

onHomeTownChanged_: function (){this.show();}

constructor: function (){if(prototype.init)this.init.apply(this,arguments);}


var obj = WestUi.FriendsBar.friendsBarUi;
for (var prop in obj)
console.log(prop + ": " + obj[prop]);