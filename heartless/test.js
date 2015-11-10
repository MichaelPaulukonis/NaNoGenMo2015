
var test = function() {

  var wordbank = require('./wordbank');
  var abilities = wordbank.abilities1.concat(wordbank.abilities2);
  var fs = require('fs');

  var search = require('../conceptnet/cnSearch');

  var bag = [];
  for (var i = 0; i < abilities.length; i++) {
    var r = search(abilities[i]);
    if (r) {
      bag.push(JSON.stringify(r, null, 2));
    }
  }

  require('fs').writeFile('lexicon.txt', bag.join('\n'));


}();
