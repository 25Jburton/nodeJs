const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
    {
        name: String,
        team_selection: String,
        explanation: String,
    },
    { timestamps: true }    
);

const Event  = mongoose.model('teamForm', EventSchema);
module.exports = Event;