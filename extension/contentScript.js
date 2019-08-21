'use strict';
const {dateIsExpected} = require('./dateIsExpected')

const isSubmittedTimesheet = document.evaluate(
    '//td[contains(., "Status: Submitted")][contains(., "Timesheet Report")]',
    document,
    null,
    XPathResult.BOOLEAN_TYPE,
    null
);

if (isSubmittedTimesheet.booleanValue) {
    checkTimesheet()
}

function checkTimesheet() {
    const currentYear = moment().year();
    const dateCellXPath = '//td[@align="right"][contains(text(),"' + currentYear + '")]';
    const dateCellXpathResult = document.evaluate(
        dateCellXPath,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    for (let i = 0; i < dateCellXpathResult.snapshotLength; i++) {
        const element = dateCellXpathResult.snapshotItem(i);

        if (dateIsExpected(element.textContent, moment)) {
            element.setAttribute('class', 'expected-date');
        } else {
            element.setAttribute('class', 'unexpected-date');
        }
    }
}