const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false
  },
  contact_info: {
    phone_no: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  orders: {
    cart: [
      {
        product_id: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1
        }
      },
    ],
    current: [
      {
        
        product_id: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true
        },
        payment_method: {
          type: String,
          default: "Cash"
        },
        address: {
          type: String,
          required: false
        },
        placedAt: {
          type: Date,
          required: true
        }
      },
    ],
    history: [
      {
        product_id: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true
        },
        payment_method: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: false
        },
        completedAt: {
          type: Date,
          required: true
        },
        amount: {
          type: Number,
          required: false
        },
        isReviewed: {
          type: Boolean,
          default: false
        }
      },
    ],
  },
  payment_details: {
    payment_method: {
      type: String,
      required: false,
    },
    account_no: {
      type: String,
      required: false,
    },
    cardholder_name: {
      type: String,
      required: false,
    },
    expiration_date: {
      type: String,
      required: false,
    },
    cvv: {
      type: String,
      required: false,
    },
    billing_address: {
      type: String,
      required: false,
    },
    issuer: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  validation: {
    validity: {
      type: Date,
      default: null
    },
    code: {
      type: String,
      default: null
    }
  },
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
  return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
