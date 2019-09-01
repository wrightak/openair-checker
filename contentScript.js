'use strict';

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
    const currentYear = moment().year().toString().slice(-2);
    const dateCellXPath = '//td[@align="right"][contains(text(),"' + currentYear + '")][not(contains(.,"%"))]';
    const dateCellXpathResult = document.evaluate(
        dateCellXPath,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    for (let i = 0; i < dateCellXpathResult.snapshotLength; i++) {
        const element = dateCellXpathResult.snapshotItem(i);

        const monthDayFormats = [
            "MM-DD-YYYY",
            "MM/DD/YYYY",
            "MM-DD-YY",
            "MM/DD/YY",
            "MMM/DD/YYYY",
            "YYYY-MM-DD",
            "YYYY.MM.DD",
            "YY-MMM-DD",
            "YYYY-MMM-DD",
        ];

        const dayMonthFormats = [
            "DD-MM-YYYY",
            "DD-MM-YY",
            "DD.MM.YY",
            "DD.MM.YYYY",
            "DD/MM/YY",
            "DD/MM/YYYY",
            "DD-MMM-YY",
            "DD-MMM-YYYY",
        ];

        let possibleDate1 = moment(element.textContent, monthDayFormats);
        let possibleDate2 = moment(element.textContent, dayMonthFormats);
        if (dateIsExpected(possibleDate1) || dateIsExpected(possibleDate2)) {
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
}
