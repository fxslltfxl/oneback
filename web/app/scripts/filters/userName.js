app.directive("userName", function () {
    return {
        require: "ngModel",
        link: function (scope, elm, attrs, ctrl) {
            var regExp = /^[\u4e00-\u9fa5]{0,50}$/;
            ctrl.$validators.username = function (modelValue, viewValue) {
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