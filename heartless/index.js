/*
 So, this tests stuff. Or something.
 Who knows.

 TODO: build creature generator
 need to create unique beasts
 probably adjective with one of the beasts
 or something else
 the hearltess tale will have to check that it is unique, and then re-query the generator
 if after 2 tries it fails, give one a number....
 [THIS WAY LIES MADNESS]

 TODO: generate powers
 TODO: generate locales

 words/adjective + words/adverb lists look useful

 geography things are too specific.
 will need some sort of list plus adj modifiers


*/

// these were ganked from dariusk's corpora project
var animals = require('./animals')['animals'];
var greekMonsters = require('./greek_monsters')['greek_monsters'];
var monsters = require('./monsters')['names'];

var beasts = animals.concat(greekMonsters).concat(monsters);

//console.log(beasts);

var pick = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var doubleTrouble = function() {

  var c1 = pick(beasts),
      c2 = pick(beasts);

  return `${c1}-${c2}`;

};

(function test() {

  for (var i = 0; i < 20; i++) {
    console.log(doubleTrouble());
  }

})();
