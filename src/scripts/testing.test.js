import game from './game';
import { assert } from 'chai'


// var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present yeah', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });

  describe('game', function() {
    it('should return text', function() {
        assert.equal(game(), 'hey');
        assert.typeOf(game(), 'string');
    });
  });
  
});