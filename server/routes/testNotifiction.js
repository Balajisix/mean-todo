const express = require('express');
const router = express.Router();
const webpush = require('web-push');
const fs = require('fs');

const subscriptionPath = './subscriptions.json'; // wherever you stored subscriptions

router.post('/', (req, res) => {
  if (fs.existsSync(subscriptionPath)) {
    const subscriptions = JSON.parse(fs.readFileSync(subscriptionPath));

    const notificationPayload = JSON.stringify({
      title: '🛎 Todo Reminder!',
      body: 'This is your test push notification!',
    });

    subscriptions.forEach(subscription => {
      webpush.sendNotification(subscription, notificationPayload).catch(err => {
        console.error('Push error:', err);
      });
    });

    res.status(200).json({ message: 'Push sent' });
  } else {
    res.status(404).json({ message: 'No subscriptions found' });
  }
});

module.exports = router;
