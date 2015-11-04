/*
 So. Plan of action
 THESE ARE ALL TO START THINGS OFF
 Main body of story is static
 call to function to get n-helpers
 helper includes helper, hero encounter-locale,
 helper ability, helper antagonist, antagonist method of defeat
 which may just come from ability, or should relate to it
 to begin, these will be stupidly static, with incremented numbers.
 concentrate on getting a dumb skeleton
 and, hey, maybe some tests, because that always trips you up
 when you least expect it and gee these don't really _need_ test do they?
 anyhow.
 Getting this "working" should help solidify the ideas of what properties
 the helper "object" should have.
 Then look into auto-generation of helpers and associated landscape
 the latter is an issu,e because we probably don't want 11 helpers in a row
 that are involved with crossing rivers or adjacent bodies of water.
 or maybe that's a secondary concern....
 I'm _thinking_ that some sort of knoweldge/rule system is required
 to deal with abilities, locales, antagonists, etc.
 but maybe it doesn't have to me even that smart.
 see 2014's example of ....
 [A Full and Complete Reckoning of Uncommon Mythical and Monstrous Creatures](https://github.com/dariusk/NaNoGenMo-2014/issues/120)
 */

'use strict';

var Heartless = function() {

  if(!(this instanceof Heartless)) {
    return new Heartless();
  }

  var useRandom = true;

  // temporary use
  function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  /*
   consists of a helper and an antagonist
   we create the antagonist first
   then the helper, which will use the defeatedBy as its ability

   for now, let's call this a ... package
   FOR WONT OF A BETTER TERM
   */
  this.getPackage = function() {

    var antagonist = this.getHelper();
    var helper = this.getHelper({ ability: antagonist.defeatedBy });

    return {
      antagonist: antagonist,
      helper: helper
    };

  };

  this.getPackages = function(n) {

    var packs = [];

    for(var i = 0; i < n; i++) {
      packs.push(this.getPackage());
    }

    return packs;

  };

  /*
   helper or antagonist?
   it depends upon who's asking
   same properties
   almost, anyway
   the helper needs to have an ability that will
   1) function in the antogonist locale and
   2) defeat the antagonist
   */
  function Creature(config) { // name, locale, ability, defeatedBy) {

    if(!(this instanceof Creature)) {
      return new Creature();
    }

    if (config === undefined) { config = {}; }

    if (useRandom) {
      if (config.name === undefined) { config.name = randomString(10); }
      if (config.locale === undefined) { config.locale = randomString(10); }
      if (config.ability === undefined) { config.ability = randomString(10); }
      if (config.defeatedBy === undefined) { config.defeatedBy = randomString(10); }
    } else {
      if (config.name === undefined) { config.name = 'name'; }
      if (config.locale === undefined) { config.locale = 'locale'; }
      if (config.ability === undefined) { config.ability = 'ability'; }
      if (config.defeatedBy === undefined) { config.defeatedBy = 'defeatedBy'; }
    }

    this.name = config.name;
    this.locale = config.locale;
    this.ability = config.ability;
    this.defeatedBy = config.defeatedBy;

  }

  this.Creature = Creature;

  this.getHelper = function(config) {

    // TODO: if nothing passed in, populate randomly
    return new Creature(config);
  };

  this.getHelpers = function(n) {

    var dc = new Creature(); // defaultCreature
    var helpers = [];

    // place-holder until a real random system shows up
    // in which case, we'd be calling getHelper
    for(var i = 0; i < n; i++) {
      let config = {
        name:       `${dc.name}-${i+1}`,
        locale:     `${dc.locale}-${i+1}`,
        ability:    `${dc.ability}-${i+1}`,
        defeatedBy: `${dc.defeatedBy}-${i+1}`
      };
      helpers.push(new Creature(config));
    }

    return helpers;
  };


  this.getIntro = function() {

    var tale = `
A king had seven sons, and when the other six went off to find brides,
he kept the youngest with him because he could not bear to be parted
from them all. They were supposed to bring back a bride for him, as
well, but they found a king with six daughters and wooed them,
forgetting their brother. But when they returned, they passed too
close to a giant's castle, and he turned them all, both princes and
princesses, to stone in a fit of rage.

When they did not return, the king, their father, tried to prevent
their brother from following, but he went.

[TODO: introduction of helpers occurs here]

On the way, he gave food to a starving raven, helped a salmon back
into the river, and gave a starving wolf his horse to eat. The wolf
let the prince ride on him, instead, and showed him the giant's
castle, telling him to go inside. The prince was reluctant fearing the
wrath of the giant, but the wolf consoled him. The wolf persuaded the
prince to enter the castle for there he would encounter not the giant,
but the princess the giant kept prisoner.

The princess was very beautiful and the prince wanted to know how he
could kill the giant and set her and his family free. The princess
said that there was no way, as the giant did not keep his heart in his
body and therefore could not be killed. When the giant returned, the
princess hid the prince, and asked the giant where he kept his heart.
He told her that it was under the door sill. The prince and princess
dug there the next day and found no heart. The princess strewed
flowers over the door sill, and when the giant returned, told him that
it was because his heart lay there. The giant admitted it wasn't there
and told her it was in the cupboard. As before, the princess and the
prince searched, to no avail; once again, the princess strewed
garlands of flowers on the cupboard and told the giant it was because
his heart was there. Thereupon the giant revealed to her that, in
fact,

[TODO: hereon out should be generated]

a distant lake held an island upon which there sat a church;
within the church was a well where a duck swam; in the duck's nest was
an egg; and in the egg was the giant's heart.

The prince rode to the lake, where the wolf jumped to the island. The
prince called upon the raven he had saved from starvation, and it
brought him the keys to the church. Once inside, he coaxed the duck to
him, but it dropped the egg in the well first, and the prince called
on the salmon to get him the egg. The wolf told him to squeeze the
egg, and when he did, the giant screamed. The wolf told him to squeeze
it again, and the giant promised anything if he would spare his life.
The prince told him to change his brothers and their brides back to
life, and the giant did so. Then the prince squeezed the egg into two
and went home with the giant's captive princess as his bride;
accompanying him were his brothers and their brides, and the king
rejoiced.`;

    return tale;
  };

};

module.exports = Heartless;
