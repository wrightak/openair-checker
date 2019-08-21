const {dateIsExpected} = require('../extension/dateIsExpected');
const date = require('../extension/datefns');

describe('dateIsExpected', function () {
    let dateToTest;
    beforeEach(function () {
        dateToTest = new Date(2019, 7, 9)
    });

    it('works for mm dd yyyy formats', function () {
        console.log(date.parse('01/02/2019', 'dd/MM/yyyy', new Date()))
        // expect(dateIsExpected('08/05/2019', dateToTest, date)).toBe(true);
        // expect(dateIsExpected('08/06/2019', dateToTest, moment)).toBe(true);
        // expect(dateIsExpected('08/07/2019', dateToTest, moment)).toBe(true);
        // expect(dateIsExpected('08/08/2019', dateToTest, moment)).toBe(true);
        // expect(dateIsExpected('08/09/2019', dateToTest, moment)).toBe(true);
    });
});