module.exports.dateIsExpected = (text, now, moment) => {
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
        "DD-MMM-YYYY"
    ];
    let monthDayDate = moment(text, monthDayFormats);
    let dayMonthDate = moment(text, dayMonthFormats);

    const previousMonday = now.day() < 5 ? now.day(-6) : now.day(1);
    const previousTuesday = now.day() < 5 ? now.day(-5) : now.day(2);
    const previousWednesday = now.day() < 5 ? now.day(-4) : now.day(3);
    const previousThursday = now.day() < 5 ? now.day(-3) : now.day(4);
    const previousFriday = now.day() < 5 ? now.day(-2) : now.day(5);

    const expectedDates = [previousMonday, previousTuesday, previousWednesday, previousThursday, previousFriday];

    let isExpected = false;
    expectedDates.forEach(expectedDate => {
        if (expectedDate.isSame(monthDayDate, 'day')) {
            isExpected = true;
        }
    });

    return isExpected;
};

