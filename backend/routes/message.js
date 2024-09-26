const router = require('express').Router();
const Message = require('../models/message');
router.post('/messages', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, message } = req.body;

    try {
        const newMessage = new Message({ firstName, lastName, email, phoneNumber, message });
        await newMessage.save();
        res.status(201).json({ success: true, message: 'Message saved successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error saving message' });
    }
    });

module.exports = router;
