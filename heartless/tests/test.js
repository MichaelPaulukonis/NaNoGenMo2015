
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

            it('should have a getHelpers(n) method', function() {
                expect(typeof(h.getHelpers)).to.equal('function');
            });

            it('should have a getAntagonist() method', function() {
                expect(typeof(h.getAntagonist)).to.equal('function');
            });

            it('should have a getAntagonists(n) method', function() {
                expect(typeof(h.getAntagonists)).to.equal('function');
            });


        });

    });

}();
