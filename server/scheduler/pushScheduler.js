const cron = require('node-cron');
const webpush = require('web-push');
const Todo = require('../models/todoModel');
const { getSubcriptions } = require('../controllers/notificationController');


const vapidKeys = {
  publicKey: process.env.PUBLIC_VAPID_KEY,
  privateKey: process.env.PRIVATE_VAPID_KEY
};

webpush.setVapidDetails('mailto:balajivs0305@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);

cron.schedule('* * * * *', async () => {
  console.log('Cron job running...');
  const now = new Date();
  const upcomingDeadline = new Date(now.getTime() + 60000);

  try {
    const todos = await Todo.find({
      deadline: { $lte: upcomingDeadline },
      notified: false
    });

    if(todos && todos.length > 0){
      todos.forEach(todo => {
        const payload = JSON.stringify({
          title: 'Todo Deadline Alert',
          body: `Your task "${todo.title}" is due soon!`
        });

        const subscriptions = getSubcriptions();
        subscriptions.forEach(subscription => {
          webpush.sendNotification(subscription, payload)
            .then(() => console.log(`Push sent for todo: ${todo.title}`))
            .catch(error => console.error('Error sending push notification: ', error));
        })

        todo.notified = true;
        todo.save();
      });
    }
  } catch(error) {
    console.error('Error in cron job: ', error);
  }
});