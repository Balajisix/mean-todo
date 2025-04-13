const cron = require('node-cron');
const webpush = require('web-push');
const Todo = require('../models/todoModel');
const Subscription = require('../models/subscription'); // Import the Subscription model

// Ensure you have set your VAPID keys in environment variables
const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_VAPID_KEY,
  privateKey: process.env.VAPID_PRIVATE_VAPID_KEY,
};

webpush.setVapidDetails(
  'mailto:balajivs0305@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Schedule a job to run every minute
cron.schedule('* * * * *', async () => {
  console.log('Cron job running...');

  const now = new Date();
  // Calculate upcoming deadline (tasks due within the next minute)
  const upcomingDeadline = new Date(now.getTime() + 60000);

  try {
    // Find todos with deadlines within the next minute and not yet notified
    const todos = await Todo.find({
      deadline: { $lte: upcomingDeadline },
      notified: false
    });

    if (todos && todos.length > 0) {
      for (const todo of todos) {
        // Build a payload for this todo
        const payloadData = {
          title: 'Todo Deadline Alert',
          body: `Your task is due soon!`
        };
        const payload = JSON.stringify(payloadData)

        // Retrieve subscriptions for the specific user referenced in the todo
        const userSubscriptions = await Subscription.find({ user: todo.user });

        // Send notification to each subscription for that user
        for (const subscription of userSubscriptions) {
          try {
            await webpush.sendNotification(subscription, payload);
            console.log(`Push sent for todo: ${todo.title} to user: ${todo.user}`);
          } catch (error) {
            console.error('Error sending push notification: ', error);
          }
        }
        // Mark this todo as notified
        todo.notified = true;
        await todo.save();
      }
    }
  } catch (error) {
    console.error('Error in cron job: ', error);
  }
});
