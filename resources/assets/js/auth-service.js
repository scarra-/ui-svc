module.exports = function () {
    var isLoggedIn = false;

    this.isLoggedIn = function() {
        if (typeof window.sessionStorage.token != 'undefined') {
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
