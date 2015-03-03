module.exports = function () {
    var messages = [];

    this.getMessages = function() {
        return messages;
    };

    this.addMessage = function(message) {
        messages.push(message);
    };

    this.clearMessages = function() {
        messages = [];
    }
}
