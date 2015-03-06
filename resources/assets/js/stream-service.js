module.exports = function () {
    var messages = [];

    this.getMessages = function() {
        return messages;
    };

    this.addMessage = function(message) {
        messages.unshift(message);
    };

    this.clearMessages = function() {
        messages = [];
    };
}
