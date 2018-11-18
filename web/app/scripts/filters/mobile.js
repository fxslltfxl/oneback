app.directive("mobile", function () {
    return {
        require: "ngModel",
        link: function (scope, elm, attrs, ctrl) {
            var yidongreg = /^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/;
            var dianxinreg = /^1[3578][01379]\d{8}$/;
            var liantongreg = /^1[34578][01256]\d{8}$/;
            
            ctrl.$validators.mobile = function (modelValue, viewValue) {
                if (ctrl.$pristine) {
                    return true;
                }
                if (yidongreg.test(modelValue) || dianxinreg.test(modelValue) || liantongreg.test(modelValue)) {
                    return true;
                }
                return false;

            }
        }
    }
});