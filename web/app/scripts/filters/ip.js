app.directive("ip", function () {
    return {
        require: "ngModel",
        link: function (scope, elm, attrs, ctrl) {
            var ipreg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            ctrl.$validators.ip = function (modelValue, viewValue) {
                if (ctrl.$pristine) {
                    return true;
                }
                if (ipreg.test(modelValue)) {
                    return true;
                }
                return false;

            }
        }
    }
});