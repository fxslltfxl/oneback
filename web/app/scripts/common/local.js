app.factory('local', ["$localStorage", "$sessionStorage", function ($localStorage) {
    return {
        set: function (key, value) {
            localStorage.setItem(key,value);
        },
        put: function (key, defaultValue) {
            return localStorage.getItem(key) || defaultValue;
        },
        putObject: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        getObject: function (key) {
            if (!(localStorage.getItem(key))) {
                return null;
            }
            return JSON.parse(localStorage.getItem(key));
        },
        remove: function(key) {
            localStorage.removeItem(key);
        }
    }
}]);