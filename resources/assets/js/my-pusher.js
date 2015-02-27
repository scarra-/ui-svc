console.info('works');

API_KEY = '7b0cc00ab6716c7191b4';

var pusher = new Pusher('7b0cc00ab6716c7191b4');
var channel = pusher.subscribe('test_channel');
channel.bind('my_event', function(data) {
    console.log(data.message);
});

/*

var pusher = new Pusher('7b0cc00ab6716c7191b4');
var channels = pusher.allChannels();
console.group('Pusher - subscribed to:');
for (var i = 0; i < channels.length; i++) {
    var channel = channels[i];
    console.log(channel.name);
}
console.groupEnd();*/
