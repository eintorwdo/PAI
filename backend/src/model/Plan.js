const mongoose = require('mognoose');

const PlanSchema = new mongoose.Schema({
    duration: {         //days
        type: Number,
        required: true,
        min: 1
    },
    cost: {
        type: Number,
        required: true,
        min: 0
    }
});

const Plan = mongoose.model('Plan', PlanSchema);
module.exports = { Plan };