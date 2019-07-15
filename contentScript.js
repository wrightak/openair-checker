// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const previousMonday = moment().day() < 5 ? moment().day(-6) : moment.day(1);
const previousTuesday = moment().day() < 5 ? moment().day(-5) : moment.day(2);
const previousWednesday = moment().day() < 5 ? moment().day(-4) : moment.day(3);
const previousThursday = moment().day() < 5 ? moment().day(-3) : moment.day(4);
const previousFriday = moment().day() < 5 ? moment().day(-2) : moment.day(5);

const expectedDates = [
    previousMonday.format("MM/DD/YYYY"),
    previousTuesday.format("MM/DD/YYYY"),
    previousWednesday.format("MM/DD/YYYY"),
    previousThursday.format("MM/DD/YYYY"),
    previousFriday.format("MM/DD/YYYY")
];

const currentYear = moment().year();
const xPath = '//td[@align="right"][contains(text(),"' + currentYear + '")]';
const xPathResult = document.evaluate(
    xPath,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
);

for (let i = 0; i < xPathResult.snapshotLength; i++) {
    const element = xPathResult.snapshotItem(i);
    if (expectedDates.includes(element.textContent)) {
        element.setAttribute('class', 'expected-date');
    } else {
        element.setAttribute('class', 'unexpected-date');
    }
}
