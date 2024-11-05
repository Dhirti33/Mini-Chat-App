const express = require("express");
const connectDB = require("./db.js");
const User = require("./userModel.js");
const Conversation = require("./conversationModel.js");
const Message = require("./messageModel.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Create a User
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user." });
  }
});

// Check if user exists
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      console.log(user)
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { password: _, ...userDetails } = user.toObject();
    res.status(200).json({ user: userDetails });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user." });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
    console.log(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

// Create a conversation between users
app.post('/conversations', async (req, res) => {
  const { userId1, userId2 } = req.body;

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [userId1, userId2] }
    });

    if (!conversation) {
      conversation = new Conversation({ participants: [userId1, userId2] });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create or fetch conversation.' });
  }
});

// Create a message
app.post('/messages', async (req, res) => {
  const { conversationId, senderId, text } = req.body;

  if (!conversationId || !senderId || !text) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const message = await Message.create({
      conversation: conversationId,
      sender: senderId,
      text
    });

    res.status(201).json(message);
    console.log("Message Sent")
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// Get all conversations
app.get('/conversations', async (req, res) => {
  try {
    const conversations = await Conversation.find({});
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversations.' });
  }
});

// Get all messages
app.get('/messages/:conversationId', async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({ conversation: conversationId });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to retrieve messages.' });
  }
});

// In your conversation routes
app.get('/conversations/check', async (req, res) => {
  const { userId1, userId2 } = req.query;
  
  try {
      const conversation = await Conversation.findOne({
          participants: { $all: [userId1, userId2] }
      });

      if (conversation) {
          res.json({ conversationId: conversation._id });
      } else {
          res.json({ conversationId: null });
      }
  } catch (error) {
      res.status(500).json({ error: 'Error checking conversation' });
  }
});



app.listen(5000, () => {
  console.log("app is running");
});