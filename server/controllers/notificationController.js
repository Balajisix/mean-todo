// In-memory array to store subcriptions
let subcriptions = [];

exports.subscribe = (req, res) => {
  const subscription = req.body;
  subcriptions.push(subscription);
  res.status(201).json({ message: 'Subscription received successfully!' });
};

exports.getSubcriptions = () => subcriptions;