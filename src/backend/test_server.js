const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/amazon', { useNewUrlParser: true });

mongoose.connection.once('open', () => {
  console.log('connected');
});
