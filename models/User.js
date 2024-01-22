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
            ref: 'User',
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

// virtual to give friends count
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })



// Initialize our User model
const User = model('user', userSchema);

module.exports = User;