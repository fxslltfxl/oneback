app.provider("apiTools", function () {
    //this.apiUrl = "http://10.10.10.138:8881/";
    // this.apiUrl = "http://bunnyteemo.natapp1.cc/";
    this.apiUrl = "http://localhost:60956/";
    this.$get = function () {
        var apiUrl = this.apiUrl;
        return {
            getApiUrl: function () {
                return apiUrl;
            }
        }
    };
});