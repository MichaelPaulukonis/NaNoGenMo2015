
var test = function() {

  var wordbank = require('./wordbank');
  var abilities = wordbank.abilities1; //.concat(wordbank.abilities2);
  // var abilities = ['dragon', 'volcano'];
  var fs = require('fs');

  var search = require('../conceptnet/cnSearch');

  var bag = {};
  for (var i = 0; i < abilities.length; i++) {
    console.log(`${i}: ${abilities[i]}`);
    var r = search(abilities[i]);
  //   if (r) {
  //     if (r['dbpedia']) { delete r['dbpedia']; }

  //     // bag[abilities[i]] = r;
  //     // bag.push(JSON.stringify(r, null, 2));
  //     // fs.appendFileSync('lexicon.txt', JSON.stringify(r, null, 2));
  //   }
  }

  // require('fs').writeFile('lexicon.txt', JSON.stringify(bag, null, 2)); //bag.join('\n'));


}();
