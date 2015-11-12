// adapted from the python original @ https://github.com/mattfister/wordtools/blob/master/conceptnet_searcher.py
// by Matt Fister

var search = function(){

  // TODO: count the actual number of files
  // where 50 := the number of files we are dealing with
  // hard-coded for this example only
  var fileCount = 50;
  var fs = require('fs');

  var stringHash = function(word) {
    var sum = 0;
    for (var i = 0; i < word.length; i++) {
      sum += i*word.charCodeAt(i);
    }
    return sum % fileCount;
  };

  var arrayToJson = function(rels) {

    var r = {};

    if (rels != undefined) {
      for (var i = 0; i < rels.length; i++) {
        var node = rels[i];
        if (!r[node[0]]) { r[node[0]] = []; }
        r[node[0]].push(node[1]);
      }
    }
    return r;

  };

  var getConceptRelations = function(concept) {

    if (concept === undefined) { concept = ''; }

    concept = concept.replace(/\s/g, '_').toLowerCase();

    // TODO: find relative path
    // since we're not doing a require anymore....
    var filename = `d:/projects/nanogenmo2015/conceptnet/conceptnetreduced/conceptnet_reduced_en_${stringHash(concept)}.json`;
    // var filename = `./conceptnetreduced/conceptnet_reduced_en_${stringHash(concept)}.json`;
    console.log(filename);

    var rels = JSON.parse(fs.readFileSync(filename, 'utf8'))[concept];
    // require chaches everything
    // so ALL OF THESE JSON FILES GET LOADED INTO MEMORY
    // which, on my machine at least,
    // isn't large enough. SO NO REQUIRE
    // var rels = require(filename)[concept];
    // delete require.cache[require.resolve(filename)];

    return arrayToJson(rels);

  };

  return getConceptRelations;

}();

module.exports = search;
