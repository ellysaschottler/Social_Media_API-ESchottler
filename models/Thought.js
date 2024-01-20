const { Schema, model } = require('mongoose');

// Schema to create Post model
const postSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
      },
    createdAt: {
      type: Date,
      default: Date.now,
// to do :use a getter method to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
        {
            reactionID: mongoose.ObjectId,
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
                default: Date.now,
 // to do :use a getter method to format the timestamp on query   
            }
        },
    ],

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
// to do: verify reactions.length above is correct

// Initialize our Post model
const Post = model('post', postSchema);

module.exports = Post;