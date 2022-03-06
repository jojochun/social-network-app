const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
    {

        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // validate using Regex
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        // array of _id values referencing the Thought model
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        // Array of _id values referencing the User model (self-reference)
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {

        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


// get total count for friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// create the User model using UserSchema
const Comment = model('User', UserSchema);

module.exports = UserSchema;