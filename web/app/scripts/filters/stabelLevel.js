app.directive("stabelLevel", function () {
    return {
        require: "ngModel",
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.stabelLevel = function (modelValue, viewValue) {
                if (ctrl.$pristine) {
                    return true;
                }
                if (parseInt(modelValue) === 1 || parseInt(modelValue) === 2 || parseInt(modelValue) === 3) {
                    return true;
                }
                return false;
               
            }
        }
    }
});