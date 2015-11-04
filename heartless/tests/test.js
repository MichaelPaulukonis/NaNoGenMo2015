
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

      it('should have a getAntagonist() method', function() {
        expect(typeof(h.getAntagonist)).to.equal('function');
      });

      it('should have a getAntagonists(n) method', function() {
        expect(typeof(h.getAntagonists)).to.equal('function');
      });

      it('should have a Creature function', function() {
        expect(typeof(h.Creature)).to.equal('function');
      });


    });


    describe('Creature', function() {

      var h = new Heartless();


      it('it should return an object', function() {
        expect(typeof(h.Creature())).to.equal('object');
      });

    });

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


  });

}();
