const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
        type:String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type:String,
        unique: true,
        required: true,
//to do: Must match a valid email address (look into Mongoose's matching validation)

    }, 
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Friends',
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

// Create a virtual property `commentCount` that gets the amount of comments per user
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })
// to do: verify friends.length above is correct


// Initialize our User model
const User = model('user', userSchema);

module.exports = User;