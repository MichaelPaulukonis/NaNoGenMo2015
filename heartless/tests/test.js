
// exeecute with `mocha test.js`

var tester = function() {

  var mocha = require('mocha'),
      chai = require('chai'),
      expect = chai.expect,
      Heartless = require('../heartless');

  describe('heartless tests', function() {

    describe('api', function() {

      var h = new Heartless();

      it('should have a getIntro() method', function() {
        expect(typeof(h.getIntro)).to.equal('function');
      });

      it('should have a getPackage() method', function() {
        expect(typeof(h.getPackage)).to.equal('function');
      });

      it('should have a getPackages(n) method', function() {
        expect(typeof(h.getPackages)).to.equal('function');
      });

      it('should have a getHelper() method', function() {
        expect(typeof(h.getHelper)).to.equal('function');
      });

      it('getHelper() should return an object', function() {
        expect(typeof(h.getHelper())).to.equal('object');
      });

      it('should have a getHelpers(n) method', function() {
        expect(typeof(h.getHelpers)).to.equal('function');
      });

      it('getHelpers(n) should return an array ', function() {
        expect(typeof(h.getHelpers)).to.equal('function');
      });

      it('should have a Creature function', function() {
        expect(typeof(h.Creature)).to.equal('function');
      });


    });


    describe('Creature', function() {

      var h = new Heartless();

      var creature = new h.Creature();

      it('should return an object', function() {
        expect(typeof(creature)).to.equal('object');
      });

      it('should return all expected properties', function() {
        expect(creature).to.have.all.keys('name', 'locale',
                                          'ability', 'defeatedBy');
      });

    });

    // this is weird, since it's the saame thing as testing the Creature class?
    describe('getHelper', function() {

      var h = new Heartless();

      var helper = h.getHelper();

      it('should return an object', function() {
        expect(typeof(helper)).to.equal('object');
      });

      it('should return all expected properties', function() {
        expect(helper).to.have.all.keys('name', 'locale',
                                        'ability', 'defeatedBy');
      });

    });

    describe('getHelpers', function() {

      var h = new Heartless();

      var helpers5 = h.getHelpers(5);
      var helpers1 = h.getHelpers(1);
      var helpers0 = h.getHelpers(0);
      var helpersnull = h.getHelpers();

      it('should return an array', function() {
        expect(Array.isArray(helpers5)).to.equal(true);
      });

      it('should return 5 when we ask for 5', function() {
        expect(helpers5.length).to.equal(5);
      });

      it('should return 1 when we ask for 1', function() {
        expect(helpers1.length).to.equal(1);
      });

      it('should return 0 when we ask for 0', function() {
        expect(helpers0.length).to.equal(0);
      });

      it('should return 0 when we don\'t pass a param', function() {
        expect(helpersnull.length).to.equal(0);
      });

    });


    describe('getPackage', function() {

      var h = new Heartless();

      var pkge = h.getPackage();

      it('should return an object', function() {
        expect(typeof(pkge)).to.equal('object');
      });

      it('should return all expected properties', function() {
        expect(pkge).to.have.all.keys('antagonist', 'helper');
      });

      it('the helper should have same ability as the antagonist\'s defeatedBy', function() {
        expect(pkge.helper.ability).to.equal(pkge.antagonist.defeatedBy);
      });

    });

    // these seem fairly stupid at the moment
    // will they be useful as time goes on, as a sanity check?
    // or am I testing the value of 0?
    describe('getPackages', function() {

      var h = new Heartless();

      var packages5 = h.getPackages(5);
      var packages1 = h.getPackages(1);
      var packages0 = h.getPackages(0);
      var packagesnull = h.getPackages();

      it('should return an array', function() {
        expect(Array.isArray(packages5)).to.equal(true);
      });

      it('should return 5 when we ask for 5', function() {
        expect(packages5.length).to.equal(5);
      });

      it('should return 1 when we ask for 1', function() {
        expect(packages1.length).to.equal(1);
      });

      it('should return 0 when we ask for 0', function() {
        expect(packages0.length).to.equal(0);
      });

      it('should return 0 when we don\'t pass a param', function() {
        expect(packagesnull.length).to.equal(0);
      });

    });

  });

}();
