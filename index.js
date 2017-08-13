var endpoint;

navigator.serviceWorker.register('service-worker.js')
.then(function(registration) {
  return registration.pushManager.getSubscription()
  .then(function(subscription) {

     if (subscription) {
      return subscription;
    }

    return registration.pushManager.subscribe({ userVisibleOnly: true });
  });
}).then(function(subscription) {
  endpoint = subscription.endpoint;

  document.getElementById('curl').textContent = 'curl -H "TTL: 60" -X POST ' + endpoint;

  fetch('./register', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      endpoint: subscription.endpoint,
    }),
  });
});

document.getElementById('doIt').onclick = function() {
  var delay = document.getElementById('notification-delay').value;
  var ttl = document.getElementById('notification-ttl').value;

  fetch('./sendNotification?endpoint=' + endpoint + '&delay=' + delay +
        '&ttl=' + ttl,
    {
      method: 'post',
    }
  );
};
