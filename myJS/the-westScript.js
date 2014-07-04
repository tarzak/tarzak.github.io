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