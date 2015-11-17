# ConceptNet

 - http://conceptnet5.media.mit.edu/web/c/en/surf_net
 - Matt Fister's [wordtools](https://github.com/mattfister/wordtools) has an offline, reduced version of ConceptNet in .json file, with a Python front-end. It's a very simple front end, and could be interesting to port to Node.
 - See it in action in his [NaNoGenMo2015](https://github.com/mattfister/nanogenmo2015) entry

```
pip install nltk
python conceptnet_searcher.py dragon
```


duplicate the word-hash in javascript:

```
var stringHash = function(word) {
 var sum = 0;
   for (var i = 0; i < word.length; i++) {
     sum += i*word.charCodeAt(i);
   }
 return sum % 50; // where 50 := the number of files we are dealing with
 // hard-coded for this example only
}
```
