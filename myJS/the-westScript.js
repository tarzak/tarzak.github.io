// ==UserScript==
// @name        myscript
// @namespace   http://*.the-west.*
// @include     http://*.the-west.*/game.php*
// @version     1
// @grant       none
// ==/UserScript==
(function(my) {
	var myt = document.createElement("script");
	myt.type = "application/javascript";
	myt.textContent = "(" + my + ")();";
	document.body.appendChild(myt);
	myt.parentNode.removeChild(myt);
})

var myObject = WestUi;
console.log(myObject);
console.log("Hello, world!");

var dom = document;
var uiCC = document.getElementById("ui_character_container");

var p = document.createElement('P');
p.innerHTML = "ansodadsa";
console.log(p.innerHTML);
uiCC.appendChild(p);

var objArr = WestUi.FriendsBar.friendsBarUi.friendsBar.getAllPlayers();
var friendsNames = [], j = 0;

for (j = 0; j < objArr.length; j++)
friendsNames[j] = objArr[j].name;
friendsNames.sort();
var rawList = friendsNames.join("\n");
console.log(rawList);
console.log(rawList.length);