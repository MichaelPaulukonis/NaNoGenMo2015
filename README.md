# NaNoGenMo2015
things. you no. GenMo-y things.

[National Novel Generation Month 2015](https://github.com/dariusk/NaNoGenMo-2015/): _Spend the month of November writing code that generates a novel of 50k+ words._

My two main projects-with-product right now are:

 - [The Programmer Who Had No Heart in His Body](https://github.com/dariusk/NaNoGenMo-2015/issues/14)
 - [The Tale of the Github Repository](https://github.com/dariusk/NaNoGenMo-2015/issues/162)


# Conversation resources

 - http://forum.makega.me/t/procedural-narrative-dialogue/91
 - http://www.blog.radiator.debacle.us/2014/04/second-times-charm-procedural-npc.html
 - http://koobazaur.com/gamedev/game-design/writing-branching-game-conversations/
 - https://github.com/srfoster/Conversations - look at it more
 - https://github.com/ncase/conversation - probably a dead end? not sure.
 - https://github.com/hinrik/hailo - chatbot thing
 - https://github.com/tdcha5/Character-Conversation - uh. student work. has a group round-robin talking. hrm.
 - https://github.com/crathulis/ConversationCreator - also in Java
 - http://forum.makega.me/t/procedural-narrative-dialogue/91/8
 - http://notepad.smedresmania.com/2011/04/20/quality-based-narrative/
 - https://groups.google.com/forum/#!topic/rec.games.roguelike.development/gj0WB-ydmNY
 - http://tomasjurman.blogspot.com/2013/02/interactive-dialogue-for-html5-game.html


# Story Generation in general

 - http://www.escapistmagazine.com/articles/view/video-games/columns/experienced-points/10168-Procedural-Stories
 - https://www.reddit.com/r/gamedev/comments/1d3zrz/the_details_of_procedural_story_generation_and/
 - [Meta-AQUA](https://web.archive.org/web/20100427191143/http://mcox.org/Meta-AQUA/) - uses a modified version of TaleSpin to produce input
 - [RoleModel: Towards a Formal Model of Dramatic Roles for Story Generation ](https://users.soe.ucsc.edu/~amsmith/papers/a17-chen.pdf)


# Minstrel

ftp://ftp.cs.ucla.edu/tech-report/1992-reports/920057.pdf


# Tale-Spin

 - [Computer Models of Thought and Language](http://tocs.ulb.tu-darmstadt.de/58992227.pdf) - pdf of the TOC of the 1973 book by Schank and Colby. Meehan was one of Schank's students, and TaleSpin uses their CBR model.
 - [A Tale-Spin Story](https://grandtextauto.soe.ucsc.edu/2008/02/19/ep-52-a-tale-spin-story/) - has some semi-technical info
 - [The Story of Meehan's Tale-Spin](https://grandtextauto.soe.ucsc.edu/2006/09/13/the-story-of-meehans-tale-spin/)
 - [Tale Spin at "Smart Machines"](https://grandtextauto.soe.ucsc.edu/2007/10/28/tale-spin-at-smart-machines/) (1987 Boston Computer Museum exhibit)
 - [Micro TaleSpin](http://eliterature.org/2006/01/meehan-and-sacks-micro-talespin/)
 - [Micro TaleSpin](https://news.ycombinator.com/item?id=9947986) @ HackerNews
 - [Micro TaleSpin]( http://norvig.com/ltd/test/micro-tale-spin.lisp) - Peter Norvig
 - [Inside Computer Understanding: 5 Programs plus miniatures](https://books.google.com/books?id=fdDGBQAAQBAJ&pg=PT272&lpg=PT272&dq=%22talespin%22+-disney+lisp&source=bl&ots=YZ1w-skWxN&sig=aqKgntGecLRwphMaLfd0bco540w&hl=en&sa=X&ved=0CEAQ6AEwB2oVChMIqbm3_KfgyAIVQqA-Ch2hhw5h#v=onepage&q=%22talespin%22%20-disney%20lisp&f=false) - 2 chapters on TaleSpin and MicroTaleSpin; google books link. The book itself can be had used for < $10
 - [Inside Micro Tale-Spin: Symbolic Computing with Lisp applied to story telling.](http://lispm.de/mts)
 - [Reading Digital Literature: Surface, Data, Interaction, and Expressive Processing](http://digitalhumanities.org/companion/view?docId=blackwell/9781405148641/9781405148641.xml&chunk.id=ss1-5-2&toc.id=0&brand=9781405148641_brand) - Noah Wardrip-Fruin. Plus a lot of other, non-_Tale-Spin_ reading at that link


# The Giant Who Had No Heart in His Body

I'm still interested in Fairy Tales (see 2014 and the resultant slightly-modified-since-then-but-not-much Malepropp).

In particular, a portion of some tales where the hero befriends several characters/creatures [despite (his) haste or advice] which then end up helping him get through a nested problem. Eg, the giant's heart is kept in a box at the top of a tower on an island in a lake past the thorns, past a guard-dragon, etc etc. I'd like to be able to generate a n-level deep problem with associated helper characters -- each of whom would have to have an attribute matched to solving the problem (bear kills dragon, eagle flies hero over lake, etc.). This would also involve some minimal conversations.

See implementation in [Heartless](https://github.com/MichaelPaulukonis/NaNoGenMo2015/tree/master/heartless). Pure templating as of 2015.11.07. Not as thrilling as I had hoped. But I had hoped for some attribute matching, instead of pure randomness-from-dumb-lists.


# nltk and word2vec (link-dump)
Okay, I'm going to be playing with some Python stuff again.

Because I want to understand how to work this: https://github.com/mewo2/vocab-mashup

 - https://github.com/dariusk/NaNoGenMo-2015/issues/72#issuecomment-154840835
 - https://www.kaggle.com/c/word2vec-nlp-tutorial/details/part-1-for-beginners-bag-of-words
 - https://www.kaggle.com/c/word2vec-nlp-tutorial/details/part-2-word-vectors
 - http://www.nltk.org/data.html
 - https://github.com/karpathy/char-rnn
 - http://karpathy.github.io/2015/05/21/rnn-effectiveness/
 - http://alexminnaar.com/word2vec-tutorial-part-i-the-skip-gram-model.html
 - https://code.google.com/p/word2vec/
 - https://radimrehurek.com/gensim/models/word2vec.html
 - https://medium.com/@klintcho/doc2vec-tutorial-using-gensim-ab3ac03d3a1
 - https://radimrehurek.com/gensim/models/doc2vec.html

# Gutenberg processing
I downloaded the DVD, and will be playing with some parsing, as well....


# simple story creator
something I poked at last year, but didn't continue with.
Very simple, and I followed the much-more-complex Proppian generator down it's endless trails.
However, I had made a note that putting in some characters from fan-fiction (or whatnot) could be interesting.
I'd like to pursue that again, maybe.
See how the effect actually plays out with the super-miniatures.

https://github.com/MichaelPaulukonis/NaNoGenMo2014/tree/cb653fbb578b907bc83b9502571cd615f70cc4e0/SimpleStoryCreator

TODO: update the orginal notes to reflect the original repo I was cloning

https://github.com/anihex/SimpleStoryCreator


# Summarization
 - https://en.wikipedia.org/wiki/Automatic_summarization
 - [http://libots.sourceforge.net/](Open Text Summarizer)
 - http://textcompactor.com/
 - http://thetokenizer.com/2013/04/28/build-your-own-summary-tool/
 - https://github.com/topliceanu/text-summarization
 - http://textsummarization.net/text-summarization-api-document
 - https://github.com/pdehaan/summarizer
  - https://www.npmjs.com/package/summarizer
  - which uses https://www.npmjs.com/package/summarize
   - although this _does not actually provide a text summary_
  - AND also uses https://github.com/jbrooksuk/node-summary
   - https://www.npmjs.com/package/node-summary
 - http://www.splitbrain.org/services/ots
 - http://textanalysisonline.com/
 - http://textminingonline.com/getting-started-with-the-automatic-text-summarization-api-on-mashape


# ConceptNet
See [conceptnet](https://github.com/MichaelPaulukonis/NaNoGenMo2015/tree/master/conceptnet)

# Github Narrative

See [github-narrative](https://github.com/MichaelPaulukonis/NaNoGenMo2015/tree/master/github-narrative)
