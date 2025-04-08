const Subscription = require('../models/subscription');

// Use asynchronous operations for persistence
exports.subscribe = async (req, res) => {
  console.log('Received subscription:', req.body);
  try {
    const subscription = req.body;

    // Check if subscription already exists
    const exists = await Subscription.findOne({ endpoint: subscription.endpoint });
    if (!exists) {
      await Subscription.create(subscription);
    }

    res.status(201).json({ message: 'Subscription received successfully!' });
  } catch (error) {
    console.error('Error saving subscription: ', error);
    res.status(500).json({ error: 'Subscription failed.' });
  }
};

// Export an async function to get all subscriptions
exports.getSubscriptions = async () => {
  return await Subscription.find({});
};
