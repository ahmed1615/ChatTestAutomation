const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  sender: String,
  text: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('messages', messageSchema);

module.exports = Message ;
