const {ValidateKeys} = require('../util/sutil');

describe('these are tests for valiatekeys', () => {
    test('inObj = null , reqKeys = null : should be false', () => {
        expect(ValidateKeys(null, null)).toEqual(false);
    })
});