/*global document:true*/
/*jslint bitwise:true*/
'use strict';

(function () {
    var TEMPLATE = '<div class="day">{day}</div>' +
        '<div class="hour">{hour}</div>' +
        '<div class="minute">{minute}</div>' +
        '<div class="second">{second}</div>',
        DAY = 86400000,    // 24*60*60*1000
        HOUR = 3600000,    // 60*60*1000
        MINUTE = 60000,    // 60*1000
        SECOND = 1000,     // 1000
        INTERVAL = SECOND,
        END,
        diff,
        timer = document.getElementById('timer'),
        html;

    function toDate(iso8601DateTime) {
        var ISO8601_REGEX = /(\d{4})-?(\d{2})(?:-?(\d{2}))?T(\d{2}):(\d{2})(?::(\d{2}))?(\+\d{2}|Z|)/,
            EMPTY_STRING = '',
            date = new Date(null),
            dt = iso8601DateTime.match(ISO8601_REGEX),
            designator;

        if (!dt) {
            //Y.log('input time is not in ISO8601 format', 'error', NAME);
            return EMPTY_STRING;
        }

        // skip input
        dt.shift();
        designator = dt.pop();

        date.setFullYear(dt.shift(), dt.shift() - 1, dt.shift());
        if (dt[0]) { date.setUTCHours(dt.shift()); }
        if (dt[0]) { date.setUTCMinutes(dt.shift()); }
        if (dt[0]) { date.setUTCSeconds(dt.shift()); }

        return date;
    }

    function getDiff() {
        var diff, d, h, m, s, start;

        start = new Date();
        diff = END - start;
        d = (diff / DAY) >> 0;
        h = ((diff - d * DAY) / HOUR) >> 0;
        m = ((diff - d * DAY - h * HOUR) / MINUTE) >> 0;
        s = ((diff - d * DAY - h * HOUR - m * MINUTE) / SECOND) >> 0;

        return {
            day: d,
            hour: h,
            minute: m,
            second: s
        };
    }

    END = toDate('2013-05-24T00:00:00Z');

    setTimeout(function iterate() {
        var diff = getDiff(),
            html = TEMPLATE.replace('{day}', diff.day).replace('{hour}', diff.hour).replace('{minute}', diff.minute).replace('{second}', diff.second);

        if (timer) { timer.innerHTML = html; }
        setTimeout(iterate, INTERVAL);
    }, 10);
}());
