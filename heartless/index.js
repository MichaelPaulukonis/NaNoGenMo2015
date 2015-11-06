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
var adjectives = require('./wordbank')['adjectives'];

var beasts = animals.concat(greekMonsters).concat(monsters);

//console.log(beasts);

var pick = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// return true or false
// 50-50 chance (unless override)
var coinflip = function(chance) {
  if (!chance) { chance = 0.5; }
  return (Math.random() < chance);
};

var doubleTrouble = function(sentiment) {

  if (sentiment === undefined) { sentiment = 'positive'; }

  var c1 = pick(beasts),
      c2 = pick(beasts);

  var name = '';

  if (coinflip(0.2)) {
    var adj = (sentiment === 'positive' ? 'positive' : 'negative');
    name = pick(adjectives[adj]) + ' ' + c2;
  } else {
    name = `${c1}-${c2}`;
  }

  return name;

};

(function test() {

  var h = new require('./heartless')();

  var twains = h.getTwains(50);

  // var m = h.getMeetings(twains);
  // var ds = h.describeSetup(twains);
  // var hs = h.handleSituation(twains);

  // console.log(m, ds, hs);

  var t = h.tellit(twains);

  console.log(t);

})();
