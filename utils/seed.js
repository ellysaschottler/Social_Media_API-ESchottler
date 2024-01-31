
const connection = require('../config/connection');
const User = require('../models/User');
const testUserData = require('./userseed.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

    const users = [
      {
      "username": "tester",
      "email": "tester@test.com"
    },
    {
      "username": "tester2",
      "email": "tester2@test.com"
    }
  ];

  await User.collection.insertMany(users)
  console.table(users);
  console.info('Seeding complete! 🌱');
   process.exit(0);
});

