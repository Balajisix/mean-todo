// In-memory array to store subcriptions
let subscriptions = [];

exports.subscribe = (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Subscription received successfully!' });
};

exports.getSubcriptions = () => subscriptions;