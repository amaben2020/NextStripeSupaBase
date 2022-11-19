// Initialize Channels client
let channels = new Pusher('app-key', {
  cluster: 'cluster-region',
});

// Subscribe to the appropriate channel
let channel = channels.subscribe('channel-name');

// Bind a callback function to an event within the subscribed channel
channel.bind('event-name', function (data) {
  // Do what you wish with the data from the event
});
