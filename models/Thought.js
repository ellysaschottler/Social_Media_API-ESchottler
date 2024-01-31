const { Schema, model, Types } = require('mongoose');


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
//to do, verify above:  Use Mongoose's ObjectId data type, Default value is set to a new ObjectId
    reactionBody:{
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
  },
  {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );



// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
      },
    createdAt: {
        type: Date,
        default: Date.now
      },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the amount of reactions on the thoughts
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })


// Initialize our Post model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;