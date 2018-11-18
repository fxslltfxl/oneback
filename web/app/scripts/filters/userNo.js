app.directive("userNo", function () {
    return {
        require: "ngModel",
        link: function (scope, elm, attrs, ctrl) {
            var regExp = /^[A-Za-z0-9]{0,50}$/;
            ctrl.$validators.userno = function (modelValue, viewValue) {
                if (ctrl.$pristine) {
                    return true;
                }
                if (regExp.test(modelValue)) {
                    return true;
                }
                return false;
            }
        }
    }
});