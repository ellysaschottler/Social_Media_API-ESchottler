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
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,

    }, 
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
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