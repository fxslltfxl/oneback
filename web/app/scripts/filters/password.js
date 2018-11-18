app.directive("password", function () {
    return {
        require: "ngModel",
        link: function (scope, elm, attrs, ctrl) {
            var passwordreg = /^[A-Za-z0-9]{4,50}$/;
            ctrl.$validators.password = function (modelValue, viewValue) {
                if (ctrl.$pristine) {
                    return true;
                }
                if (passwordreg.test(modelValue)) {
                    return true;
                }
                return false;

            }
        }
    }
});