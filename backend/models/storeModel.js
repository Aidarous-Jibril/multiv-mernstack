const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const validator = require('validator');


  const storeSchema = new mongoose.Schema({
      name: {
          type: String,
          required:  [true, 'Please enter a name']
      },
      email: {
          type: String,
          required: [true, 'Please enter an email'],
          unique: true,
          validate: [validator.isEmail, 'Please enter a valid email'],
      },
      password: {
          type: String,
          required: [true, 'Please enter a password'],
          minlength: [6, 'Minimum password length is 6 characters']
      },
      description: {
        type: String,
      },
      address: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      role: {
        type: String,
        default: "Seller",
      },
      avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      zipCode: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
  }, {
      timestamps: true
  })
  


// static method to register user 
// storeSchema.statics.register = async function(name, email, address, zipCode, password, phoneNumber, avatar) {

//   // //validation
//   if(!name || !email || !phoneNumber || !address || !zipCode || !password  || !avatar ) {
//     throw Error('All fields must be filled ')
//   }
//   if(!validator.isEmail(email)) {
//     throw Error('Please enter a valid email')
//   }
//   if(!validator.isStrongPassword(password, { minLength: 8  })) {
//     throw Error('Password is not strong enough')
//   };

//   const storeExists = await this.findOne({ email });

//   if (storeExists) {
//     throw Error('Email alreday in use for another store');
//   };

//   const salt = await bcrypt.genSalt(10)
//   const hash = await bcrypt.hash(password, salt);

//   const store = await this.create({name, email, phoneNumber, address, zipCode, avatar, password: hash})

//   return store
// }

// fire a function before doc saved to db
storeSchema.pre('save', async function(next) {
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


// static method to login user
storeSchema.statics.login = async function(email, password) {
    // //validation
    if(!email || !password) {
      throw Error('All fields must be filled ')
    }

    const user = await this.findOne({ email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };

module.exports = mongoose.model('Store', storeSchema)
