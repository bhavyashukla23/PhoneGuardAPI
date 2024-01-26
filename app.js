const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Initializ Sequelize with MySQL
const sequelize = new Sequelize('caller', 'root', 'Password@123', {
  host: 'localhost',
  dialect: 'mysql',
});

// Defining User and Contact models
const User = sequelize.define('users', {
    name: DataTypes.STRING,
    phone_number: { type: DataTypes.STRING, unique: true },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    timestamps: false, 
  });

  
  const Contact = sequelize.define('contacts', {
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  
  // Define SpamReport model
  const SpamReport = sequelize.define('spamreports', {
    reporter_id: DataTypes.INTEGER,
    phone_number: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  

// Define associations
User.hasMany(Contact);
Contact.belongsTo(User);

// API routes
//register a user
app.post('/register', async (req, res) => {
    try {
      const { name,phone_number,email,password } = req.body;

      // Hashing the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
  
      //to create a new user
      const user = await User.create({ name, phone_number, email,password: hashedPassword });

      // to create a contact for the registered user
    const contact = await Contact.create({ name, phone_number, email });
    await user.addContact(contact);
  
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Mark a number as spam
app.post('/markSpam', async (req, res) => {
  try {
    const { reporter_id,phone_number } = req.body;
    const spamReport = await SpamReport.create({ reporter_id, phone_number });
    res.json(spamReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Search by name or phone number
app.get('/search', async (req, res) => {
    const { query } = req.query;
  
    try {
      const results = await User.findAll({
        where: {
          [Sequelize.Op.or]: [
            { name: { [Sequelize.Op.startsWith]: query } },
            { name: { [Sequelize.Op.substring]: query } },
            { phone_number: query },
          ],
        },
        include: [
          {
            model: Contact,
            attributes: ['name', 'phone_number', 'email'],
          },
        ],
      });
      res.json(results);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
    

//database synchronization and server start
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
