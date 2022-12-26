const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, maxLenght: 255 },
    email: { type: String, maxLenght: 255, require: true, lowercase: true },
    password: { type: String, maxLenght: 255, require: true },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
},
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User)