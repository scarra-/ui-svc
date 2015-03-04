


module.exports = function () {
    var isLoggedIn = false;

    this.isLoggedIn = function() {
        if (window.localStorage.getItem('bootcamp.token') !== null) {
            isLoggedIn = true;
        }
        return isLoggedIn;
    };

    this.login = function() {
        isLoggedIn = true;
    };

    this.logout = function() {
        isLoggedIn = false;
    };
}
