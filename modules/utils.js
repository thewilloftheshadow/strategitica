const monthNames = [
    ['January', 'Jan'],
    ['February', 'Feb'],
    ['March', 'Mar'],
    ['April', 'Apr'],
    ['May', 'May'],
    ['June', 'Jun'],
    ['July', 'Jul'],
    ['August', 'Aug'],
    ['September', 'Sep'],
    ['October', 'Oct'],
    ['November', 'Nov'],
    ['December', 'Dec']
];

const frequencyPlurals = {
    'daily': 'day(s)',
    'weekly': 'week(s)',
    'monthly': 'month(s)',
    'yearly': 'year(s)'
};

// debulked onresize handler
function onResize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};

/**
 * Gets a URL parameter by its name.
 * @param {string} name - The parameter name
 */
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * You can't just output a Date variable in JS and expect it to look readable,
 * and for debugging purposes, I want things to be readable. So this is here to
 * create understandable keys for the big fat date/task object in
 * {@link loadCalendar}. Also, I needed dates to be formatted in a way that an
 * input element with type="date" could work with.
 * @param {Date} date 
 * @returns {string} A readable version of a given date
 */
function getDateKey(date) {
    return date.getUTCFullYear() + '-' + (date.getUTCMonth() <= 8 ? '0' : '') + (date.getUTCMonth() + 1) + '-' + (date.getUTCDate() <= 9 ? '0' : '') + date.getUTCDate();
}

/**
 * Gets the ordinal of a given number, e.g. the ordinal for 1 is "st", the
 * ordinal for 12 is "th", etc.
 * @param {number} number 
 * @returns {string} The ordinal
 */
function getNumberOrdinal(number) {
    var numberAsString = number.toString();
    var ordinal = '';

    if (numberAsString.endsWith('11') || numberAsString.endsWith('12') || numberAsString.endsWith('13')) {
        ordinal = 'th';
    }
    else if (numberAsString.endsWith('1')) {
        ordinal = 'st';
    }
    else if (numberAsString.endsWith('2')) {
        ordinal = 'nd';
    }
    else if (numberAsString.endsWith('3')) {
        ordinal = 'rd';
    }
    else {
        ordinal = 'th';
    }

    return ordinal;
}

/**
 * Ahem, uh, in case you didn't know, some months have 30 days, some have 31...
 * some even have 28 or 29! This determines what the last day of the month is
 * for a given month and year.
 * @param {number} year - The year, i.e. 2020
 * @param {number} month - The month, e.g. 0 for January, 1 for February, etc.
 * @returns {number} The last day of the given month and year, e.g. 31
 */
function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function formatDuration(durationInMinutes) {
    var durationFormatted = '';

    if (durationInMinutes >= 60) {
        var durationInHours = durationInMinutes / 60;

        durationFormatted = (durationInHours % 1 === 0 ? durationInHours : durationInHours.toFixed(1)) + 'h';
    }
    else {
        durationFormatted = durationInMinutes + 'm';
    }

    return durationFormatted;
}

function updateToast(type, title, body) {
    var el = $('#strategitica-toast-' + type);
    el.find('.toast-title-js').html(title);
    el.find('.toast-body-js').html(body);
    el.toast('show');
}

export { monthNames, frequencyPlurals, onResize, getUrlParameter, getDateKey, getNumberOrdinal, getLastDayOfMonth, formatDuration, updateToast };