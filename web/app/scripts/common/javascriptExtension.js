
Date.prototype.getWeekOfYear = function (weekStart) {
    weekStart = (weekStart || 0) - 0;
    if (isNaN(weekStart) || weekStart > 6) weekStart = 0;

    var year = this.getFullYear();
    var firstDay = new Date(year, 0, 1);
    var firstWeekDays = 7 - firstDay.getDay() + weekStart;
    var dayOfYear = (((new Date(year, this.getMonth(), this.getDate())) - firstDay) / (24 * 3600 * 1000)) + 1;
    return Math.ceil((dayOfYear - firstWeekDays) / 7) + 1;
};

Date.prototype.getWeekStartDate = function (weekStart) {
    weekStart = (weekStart || 0) - 0;
    if (isNaN(weekStart) || weekStart > 6) weekStart = 0;

    var year = this.getFullYear();
    var month = this.getMonth();
    var day = this.getDate();
    var dayOfWeek = this.getDay() == 0 ? 7 : this.getDay();
    var weekStartDate = new Date(year, month, day - (dayOfWeek - weekStart));
    return weekStartDate;
};


Date.prototype.getWeekEndDate = function (weekStart) {
    weekStart = (weekStart || 0) - 0;
    if (isNaN(weekStart) || weekStart > 6) weekStart = 0;

    var year = this.getFullYear();
    var month = this.getMonth();
    var day = this.getDate();
    var dayOfWeek = this.getDay() == 0 ? 7 : this.getDay();
    var weekStartDate = new Date(year, month, day + (6 - dayOfWeek + weekStart));
    return weekStartDate;
};

Date.prototype.addDays = function (days) {

    var year = this.getFullYear();
    var month = this.getMonth();
    var day = this.getDate() + days;
    return new Date(year, month, day);
};

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

String.prototype.contains = function (it) {
    return this.indexOf(it) != -1;
};
String.prototype.format = function(args) {
    if (arguments.length > 0) {
        var result = this;
        if (arguments.length == 1 && typeof(args) == "object") {
            for (var key in args) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] == undefined) {
                    return "";
                } else {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    } else {
        return this;
    }
};

Array.prototype.getById = function(id) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].Id == id) {
            return this[i];
        }
    }
    return null;
};

Array.prototype.getMin = function (field) {
    var min = undefined;
    for (var i = 0; i < this.length; i++) {
        if (i == 0) {
            min = this[i][field];
        }
        if (min > this[i][field]) {
            min = this[i][field];
        }
    }
    return min;
};
Array.prototype.getMax = function (field) {
    var max = undefined;
    for (var i = 0; i < this.length; i++) {
        if (i == 0) {
            max = this[i][field];
        }
        if (max < this[i][field]) {
            max = this[i][field];
        }
    }
    return max;
};