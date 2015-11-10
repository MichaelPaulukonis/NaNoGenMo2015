// adapted from the python original @ https://github.com/mattfister/wordtools/blob/master/conceptnet_searcher.py
// by Matt Fister

var search = function(){

  // TODO: count the actual number of files
  // where 50 := the number of files we are dealing with
  // hard-coded for this example only
  var fileCount = 50;


  var stringHash = function(word) {
    var sum = 0;
    for (var i = 0; i < word.length; i++) {
      sum += i*word.charCodeAt(i);
    }
    return sum % fileCount;
  };

  var arrayToJson = function(rels) {

    var r = {};

    for (var i = 0; i < rels.length; i++) {
      var node = rels[i];
      if (!r[node[0]]) { r[node[0]] = []; }
      r[node[0]].push(node[1]);
    }

    return r;

  };

  var getConceptRelations = function(concept) {

    if (concept === undefined) { concept = ''; }

    concept = concept.replace(/\s/g, '_').toLowerCase();

    var filename = `./conceptnetreduced/conceptnet_reduced_en_${stringHash(concept)}.json`;

    var cnjson = require(filename);

    var rels = [];
    if ( cnjson[concept] ) { rels = cnjson[concept]; }

    return arrayToJson(rels);

  };

  return getConceptRelations;

}();

module.exports = search;

// console.log(process.argv);

// var concept = process.argv.slice(2)[0];

// var rels = search(concept);

// console.log(rels);
