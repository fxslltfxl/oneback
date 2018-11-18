app.directive("number", function () {
    return {
        require: "ngModel",
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.number = function (modelValue, viewValue) {
                if (ctrl.$pristine) {
                    return true;
                }
                if (parseInt(modelValue) > 0) {
                    return true;
                }
                return false;

            }
        }
    }
});