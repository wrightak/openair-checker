'use strict';

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

    const formats = [
        "MM-DD-YYYY",
        "MM/DD/YYYY",
        "MM-DD-YY",
        "MM/DD/YY",
        "MMM/DD/YYYY",
        "DD-MM-YYYY",
        "DD-MM-YY",
        "DD.MM.YY",
        "DD.MM.YYYY",
        "DD/MM/YY",
        "DD/MM/YYYY",
        "YYYY-MM-DD",
        "YYYY.MM.DD",
        "DD-MMM-YY",
        "DD-MMM-YYYY",
        "YY-MMM-DD",
        "YYYY-MMM-DD",
    ];

    let date = moment(element.textContent, formats);
    if (dateIsExpected(date)) {
        element.setAttribute('class', 'expected-date');
    } else {
        element.setAttribute('class', 'unexpected-date');
    }
}

function dateIsExpected(date) {
    const previousMonday = moment().day() < 5 ? moment().day(-6) : moment().day(1);
    const previousTuesday = moment().day() < 5 ? moment().day(-5) : moment().day(2);
    const previousWednesday = moment().day() < 5 ? moment().day(-4) : moment().day(3);
    const previousThursday = moment().day() < 5 ? moment().day(-3) : moment().day(4);
    const previousFriday = moment().day() < 5 ? moment().day(-2) : moment().day(5);

    const expectedDates = [previousMonday, previousTuesday, previousWednesday, previousThursday, previousFriday];

    let isExpected = false;
    expectedDates.forEach(expectedDate => {
        if (expectedDate.isSame(date, 'day')) {
            isExpected = true;
        }
    });

    return isExpected;
}
