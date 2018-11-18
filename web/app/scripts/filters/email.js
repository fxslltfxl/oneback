app.directive("email", function () {
    return {
        require: "ngModel",
        link: function (scope, elm, attrs, ctrl) {
            var emailreg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            ctrl.$validators.email = function (modelValue, viewValue) {
                if (ctrl.$pristine) {
                    return true;
                }
                if (!modelValue) {
                    return true;
                }
                if (emailreg.test(modelValue)) {
                    return true;
                }
                return false;

            }
        }
    }
});