self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.showNotification('Firefox Send', {
      body: event.data.text() + ' has been downloaded.',
    })
  );
});
