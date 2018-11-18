app.directive("port", function () {
    return {
        require: "ngModel",
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.port = function (modelValue, viewValue) {
                if (ctrl.$pristine) {
                    return true;
                }
                if (parseInt(modelValue) >= 0 && parseInt(modelValue) <= 65535) {
                    return true;
                }
                return false;

            }
        }
    }
});