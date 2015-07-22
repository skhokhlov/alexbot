var alexbot = require('./alexbot.js');

/**
 * Parse text string and return date
 * @param text
 * @returns {string}
 */
alexbot.parse = function (text) {

    var TOKENS = {
        remind: /^напомни /,
        tommorow: /^завтра/,
        afterTommorow: /^послезавтра /,
        'in': /^в \d(:\d)?/
    };

    /**
     * Test for remind
     * @param str
     * @returns {*}
     */
    function tester(str) {
        return TOKENS.remind.test(str) ? parseRemind(str.replace(TOKENS.remind, '')) : {type: 'text'};
    }

    /**
     * Получает на вход строку и ищет в ней дату и текст
     * @param str
     * @returns {*}
     */
    function parseRemind(str) {
        var words = str.split(' ');
        var tokens = [TOKENS.tommorow, TOKENS.afterTommorow, TOKENS.in];
        var date = new Date;
        var res = {
            time: {
                year: date.getFullYear(),
                month: date.getMonth(),
                date: date.getDate(),
                hours: date.getHours() + 3,
                minutes: date.getMinutes()
            }
        };
        for (var i = 0; i < words.length; ++i) {
            for (var j = 0; j < tokens.length; ++j) {
                if (TOKENS.tommorow.test(words[i])) {
                    res.time.
                }
            }
        }
    }

    /**
     * data format:
     * {
     *  year: 2015,
     *  month: 3,
     *  date: 4,
     *  hours: 5,
     *  minutes: 6
     * }
     * @param data
     */
    function validateDate(data) {

        function minutes(m) {
            if (m >= 60) {
                var c = 0;
                while (m >= 60) {
                    m -= 60;
                    c++;
                }
                data.minutes = m;
                return hours(data.hours + c);
            } else {
                return hours(data.hours);
            }
        }

        function hours(h) {
            if (h >= 60) {
                var c = 0;
                while (h >= 24) {
                    h -= 24;
                    c++;
                }
                data.hours = h;
                return months(data.days + c, data.month);
            } else {
                return months(data.days, data.month);
            }
        }

        function months(d, m) {
            if (m > 12) {
                var c = 0;
                while (m > 12) {
                    m -= 12;
                    c++;
                }
                data.months = m;
                return days(d);
            } else {
                return days(d);
            }
        }

        //FIXME: Может работать неправильно при переходах между месяцами
        function days(d) {
            var c = 0;
            switch (data.months) {
                case 1 || 3 || 5 || 8 || 10 || 12:
                    c = 0;
                    while (d >= 31) {
                        h -= 31;
                        c++;
                    }
                    data.month += c;
                    break;

                case 4 || 6 || 9 || 11:
                    c = 0;
                    while (d >= 30) {
                        h -= 30;
                        c++;
                    }
                    data.month += c;
                    break;

                case 2:
                    if (data.year % 4 && !data.year % 100 || data.year % 400) {
                        c = 0;
                        while (d >= 29) {
                            h -= 29;
                            c++;
                        }
                        data.month += c;
                    } else {
                        c = 0;
                        while (d >= 28) {
                            h -= 28;
                            c++;
                        }
                        data.month += c;
                    }
                    break;
            }

            return data;
        }

        return minutes(data.minutes);
    }

    return tester(text.toLowerCase());

};

module.exports = alexbot;
