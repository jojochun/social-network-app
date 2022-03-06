const { Schema, model, Types } = require('mongoose');
const moment = require(moment);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    // array of nested documents created with ReactionSchema
    reactions: [ReactionSchema]

},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },

        id: false
    }
);

//  Reaction (Schema only)
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId(),
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        Required: true,
        maxlength: 280
    },
    userName: {
        type: String,
        Required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
},
    {
        toJSON: {
            getters: true
        }

    });


// get total count of reactions
ThoughtSchema.virtual('reactionCount').get(function () {
    // reduce() takes 2 parameters (accumulator and currentValue).  Returns revised total for next iteration thru the array
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;