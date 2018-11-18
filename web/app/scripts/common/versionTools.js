app.provider("versionTools", function () {
    this.lastBuildTimeStamp="20180606101207";
    this.$get = function () {
	    var lastBuildTimeStamp = this.lastBuildTimeStamp;
        return {
            getLastBuildTimeStamp: function () {
                return lastBuildTimeStamp;
            }
        }
    };
});