const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
    {
        // Define the schema for our form
        title: {
            type: String,
            required: true
        }
    }
)

const Event = mongoose.model('event', EventSchema);

module.exports = Event;