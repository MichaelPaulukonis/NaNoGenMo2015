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

  var indefinite = require('./indefinite'),
      useRandom = true,
      _ = require('underscore');

  // TODO: look at implementation in https://github.com/MichaelPaulukonis/solanasbot03/blob/master/sentence.js
  var a = function(word) { return indefinite(word) + ' ' + word; };

  var pick = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // return true or false
  // 50-50 chance (unless override)
  var coinflip = function(chance) {
    if (!chance) { chance = 0.5; }
    return (Math.random() < chance);
  };

  /*
   consists of a helper and an antagonist
   we create the antagonist first
   then the helper, which will use the defeatedBy as its ability

   for now, let's call this a ... twain
   FOR WONT OF A BETTER TERM
   */
  this.getTwain = function() {

    var antagonist = this.getHelper({ sentiment: 'negative' });

    var helper = this.getHelper({ ability: antagonist.defeatedBy,
                                  sentiment: 'positive',
                                  defeatedBy: 'nothing' });

    return {
      antagonist: antagonist,
      helper: helper
    };

  };

  this.getTwains = function(n) {

    var packs = [];

    for(var i = 0; i < n; i++) {
      packs.push(this.getTwain());
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
      if (config.sentiment === undefined) { config.sentiment = 'positive'; }
      if (config.name === undefined) { config.name = this.nameGen(config.sentiment); }
      if (config.locale === undefined) { config.locale = this.localeGen(); }
      if (config.ability === undefined) { config.ability = this.abilityGen(); }
      if (config.defeatedBy === undefined) { config.defeatedBy = this.abilityGen(); }
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

    return this;

  }

  var wordbank = require('./wordbank');
  var animals = require('./animals')['animals'];
  var greekMonsters = require('./greek_monsters')['greek_monsters'];
  var monsters = require('./monsters')['names'];
  var adjectives = require('./wordbank')['adjectives'];
  Creature.prototype.beasts = animals.concat(greekMonsters).concat(monsters);
  Creature.prototype.locales = { 'nouns': require('./wordbank')['nouns']['locales'],
                                 'adjectives': require('./wordbank')['adjectives']['locales'] };
  Creature.prototype.abilities = wordbank.abilities1.concat(wordbank.abilities2);

  Creature.prototype.abilityGen = function() {
    return pick(this.abilities);
  };

  Creature.prototype.localeGen = function() {
    return pick(this.locales.adjectives) + ' ' + pick(this.locales.nouns);
  };

  Creature.prototype.nameGen = function(sentiment) {

    if (sentiment === undefined) { sentiment = 'positive'; }

    var c1 = pick(this.beasts),
        c2 = pick(this.beasts);

    var name = '';

    if (coinflip(0.2)) {
      var adj = (sentiment === 'positive' ? 'positive' : 'negative');
      name = pick(adjectives[adj]) + ' ' + c2;
    } else {
      name = `${c1}-${c2}`;
    }

    return name;

  };

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

  this.getMeetings = function(twains) {
    // TODO: how does he help these things?
    // well, let's just say "helped" at this point

    var meets = [],
        tLength = twains.length;
    meets.push('On the way, ');

    // reason for helping
    // then can be recounted later, as well.
    // would be nice if... you know, things made "sense"
    for (var i = 0; i < tLength-1; i++) {
      meets.push(`he helped a ${twains[i].helper.name}, `);
    }

    var finalMeet = twains[tLength-1].helper.name;

    var closeText = ' gave a starving {{WOLF}} his horse to eat. The {{WOLF}} let the {{PRINCE}} ride on him, instead, and showed him the {{GIANT}}\'s castle, telling him to go inside. The {{PRINCE}} was reluctant fearing the wrath of the {{GIANT}}, but the {{WOLF}} consoled him. The {{WOLF}} persuaded the {{PRINCE}} to enter the castle for there he would encounter not the {{GIANT}}, but the princess the {{GIANT}} kept prisoner.'.replace(/{{WOLF}}/ig, finalMeet);

    closeText = ((tLength === 1) ? 'he' : 'and') + closeText;

    meets.push(closeText);

    return meets.join('');

  };


  this.describeSetup = function(twains) {

    var desc = [],
        tLength = twains.length;

    desc.push('Thereupon the {{GIANT}} revealed to her that, in fact, ');

    for (var i = 0; i < tLength; i++) {
      var locale = twains[i].antagonist.locale,
          beast = twains[i].antagonist.name;
      desc.push(`there was a ${locale} with a ${beast}`);
      if (i < tLength - 1) {
        desc.push(', beyond that ');
      }
    }

    desc.push(`, and in the ${beast}'s nest was an egg; and in the egg was the {{GIANT}}\'s heart.`);

    return desc.join('');

  };

  this.handleSituation = function(twains) {
    var desc = [],
        tLength = twains.length;

    var finalHelper = twains[tLength-1].helper.name;
    var finalAntag = twains[tLength-1].antagonist.name;

    for (var i = 0; i < tLength; i++) {
      var antag = twains[i].antagonist.name,
          helper = twains[i].helper.name,
          ability = twains[i].helper.ability;

      var menace = `The {{PRINCE}} rode {{ON}}to the ${twains[i].antagonist.locale}, where he was menaced by a ${antag}.`
      .replace(/{{ON}}/, (i === 1) ? 'on ' : '');
      desc.push(menace);

      // menacing from antagonist, or other such encounter
      desc.push(`The {{PRINCE}} called on the ${helper} to defeat the ${antag}.`);
      desc.push(`The ${helper} defeated the ${antag} by using its ${ability}.`);

    }

    desc.push(`The ${finalHelper} plucked the egg from the nest of the ${finalAntag}, gave it to the {{PRINCE}}, and told him to squeeze it. When he did, the {{GIANT}} screamed. The ${finalHelper} told him to squeeze it again, and the {{GIANT}} promised anything if he would spare his life. The {{PRINCE}} told him to change his brothers and their brides back to life, and the {{GIANT}} did so. Then the {{PRINCE}} squeezed the egg into two and went home with the {{GIANT}}'s captive princess as his bride; accompanying him were his brothers and their brides, and the king rejoiced.`);

    return desc.join(' ');
  };


  this.getTale = function() {

    var tale = `
There came a king who had seven sons, and when the other six went off to find brides, he kept the youngest with him because he could not bear to be parted from them all. They were supposed to bring back a bride for him, as well, but they found a king with six daughters and wooed them, forgetting their brother. But when they returned, they passed too close to a {{GIANT}}'s castle, and he turned them all, both princes and princesses, to stone in a fit of rage.

When they did not return, the king, their father, tried to prevent their brother from following, but he went.

{{HELPERINTRO}}

The princess was very beautiful and the {{PRINCE}} wanted to know how he could kill the {{GIANT}} and set her and his family free. The princess said that there was no way, as the {{GIANT}} did not keep his heart in his body and therefore could not be killed. When the {{GIANT}} returned, the princess hid the {{PRINCE}}, and asked the {{GIANT}} where he kept his heart. He told her that it was under the door sill. The {{PRINCE}} and princess dug there the next day and found no heart. The princess strewed flowers over the door sill, and when the {{GIANT}} returned, told him that it was because his heart lay there. The {{GIANT}} admitted it wasn't there and told her it was in the cupboard. As before, the princess and the {{PRINCE}} searched, to no avail; once again, the princess strewed garlands of flowers on the cupboard and told the {{GIANT}} it was because his heart was there. {{DESCRIBESETUP}}

{{FINALE}}`;

    return tale;
  };

  this.tellit = function(twains, giant) {

    var m = this.getMeetings(twains);
    var ds = this.describeSetup(twains);
    var hs = this.handleSituation(twains);

    giant = (giant === undefined
             ? this.Creature().nameGen('negative')
             : giant);

    var prince = 'prince';

    var story = this.getTale().replace(/{{HELPERINTRO}}/, m)
          .replace(/{{DESCRIBESETUP}}/, ds)
          .replace(/{{FINALE}}/, hs)
          .replace(/{{GIANT}}/ig, giant)
          .replace(/{{PRINCE}}/ig, prince);

    return story;

  };

  /// blarg, brain-dead.
  // pass in the CURRENT GIANT, as well as the transformation
  this.ongoing = function(twains, giant) {

    giant = (giant === undefined
             ? this.Creature().nameGen('negative')
             : giant);

    var prince = 'prince';

    var sadness = `

Eventually, the {{PRINCE}}, who lived a long and happy life, found his happiness slipping from his fingers. In time, his heart became hardened, his rule became corrupt, and he became a {{GIANT}}.

`;

    var tale = this.tellit(twains, giant);

    giant = this.Creature().nameGen('negative');

    tale += sadness
      .replace(/{{GIANT}}/ig, giant)
      .replace(/{{PRINCE}}/ig, prince);

    return { tale: tale,
             giant: giant
           };

  };

  this.teller = function(config) {
    if (config === undefined) {
      config = {
        twains: [],
        giantThreat: undefined,
        giantFuture: undefined,
        continueTale: false
      };
    }

    var giant = config.giantThreat,
        twains = config.twains,
        giantFuture = config.giantFuture;

    if (giant === undefined) {
      giant = (giant === undefined
               ? this.Creature().nameGen('negative')
               : giant);
    }

    var m = this.getMeetings(twains);
    var ds = this.describeSetup(twains);
    var hs = this.handleSituation(twains);

    var prince = 'prince';

    var story = this.getTale().replace(/{{HELPERINTRO}}/, m)
          .replace(/{{DESCRIBESETUP}}/, ds)
          .replace(/{{FINALE}}/, hs)
          .replace(/{{GIANT}}/ig, giant)
          .replace(/{{PRINCE}}/ig, prince);

    if (config.continueTale) {
      // TODO: implement core of ongoing
      var sadness = `

Eventually, the {{PRINCE}}, who lived a long an happy life, found his happiness slipping from his fingers. In time, his heart became hardened, his rule became corrupt, and he became a {{FUTUREGIANT}}.

`;
      if (giantFuture === undefined) {
        giantFuture = this.Creature().nameGen('negative');
      }

      story += sadness
        .replace(/{{FUTUREGIANT}}/ig, giantFuture)
        .replace(/{{PRINCE}}/ig, prince);

    }

    // TODO: return object of tale and giantFuture as giant...

    return { tale: story,
             giantFuture: giantFuture
           };
  };


};

module.exports = Heartless;
