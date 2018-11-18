app.factory("httpProxy", ["$http", "$q", "apiTools",  function ($http, $q, apiTools) {
    var baseUrl = apiTools.getApiUrl();
    var getHeaders = function () {
    };
    var handleError = function (status, data) {
        // ReSharper disable once AssignedValueIsNeverUsed
        var error = {};
        if (data) {
            error = { Code: status, Errors: [data.Message] }
        } else {
            error = { Code: status, Errors: [{ Error: "Service error" }] };
        }
        return error;
    }
    return {
        get: function (action, option) {
            var deferred = $q.defer();
            var defaultOption = {
                method: "Get",
                headers: getHeaders(),
                url: baseUrl + action,
                cache: false
            };
            option = $.extend(defaultOption, option);
            $http(option).then(onSuccess, onError);

            function onSuccess(response) {
                deferred.resolve(response.data);
            }

            function onError(response) {
                var error = handleError(response.status, response.data);
                deferred.reject(error);
            }
            return deferred.promise;
        },

        post: function (action, data, option) {
            var deferred = $q.defer();
            var defaultOption = {
                method: "Post",
                headers: getHeaders(),
                crossDomain: true,
                data: data,
                url: baseUrl + action,
                cache: false
            };
            option = $.extend(defaultOption, option);
            $http(option).then(onSuccess, onError);
            function onSuccess(response) {
                deferred.resolve(response.data);
            }

            function onError(response) {
                var error = handleError(response.status, response.data);
                deferred.reject(error);
            }

            return deferred.promise;
        },

        put: function (action, data, option) {
            var deferred = $q.defer();
            var defaultOption = {
                method: "Put",
                headers: getHeaders(),
                data: data,
                url: baseUrl + action,
                cache: false
            };
            option = $.extend(defaultOption, option);
            $http(option).then(onSuccess, onError);
            function onSuccess(response) {
                deferred.resolve(response.data);
            }
            function onError(response) {
                var error = handleError(response.status, response.data);
                deferred.reject(error);
            }
            return deferred.promise;
        },

        Delete: function (action, option) {
            var deferred = $q.defer();
            var defaultOption = {
                method: "Delete",
                headers: getHeaders(),
                url: baseUrl + action,
                cache: false
            };
            option = $.extend(defaultOption, option);
            $http(option).then(onSuccess, onError);
            function onSuccess(response) {
                deferred.resolve(response.data);
            }
            function onError(response) {
                var error = handleError(response.status, response.data);
                deferred.reject(error);
            }

            return deferred.promise;
        },

        Download: function (action,option) {
            var deferred = $q.defer();
            var defaultOption = {
                responseType: "blob",
                method: "Get",
                headers: getHeaders(),
                url: baseUrl + action,
                cache: false
            };
            option = $.extend(defaultOption, option);
            $http(option).then(onSuccess, onError);

            function onSuccess(response) {
                deferred.resolve(response);
            }

            function onError(response) {
                var error = handleError(response.status, response.data);
                deferred.reject(error);
            }
            return deferred.promise;
        }
    };
}]);