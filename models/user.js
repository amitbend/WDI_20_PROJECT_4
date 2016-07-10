var mongoose  = require("mongoose");
var bcrypt    = require('bcrypt-nodejs');
var validator = require('validator');

var userSchema = mongoose.Schema({
  local: {
    username:     { type: String },
    name:         { type: String },
    image:        { type: String },
    email:        { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true }
  },
  songs: [{ type: mongoose.Schema.ObjectId, ref: 'Song' }]
});

/* Validate password */

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.local.passwordHash, null);
};

/* Virtuals */

userSchema.virtual('local.password')
.get(function() {
  return this._password;
})
.set(function(password) {
  this._password = password;
  this.local.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
});

userSchema.virtual('local.passwordConfirmation')
.get(function() {
  return this._passwordConfirmation;
})
.set(function(value) {
  this._passwordConfirmation = value;
});

/* Validations */

userSchema.path('local.passwordHash').validate(function(v) {
  if (this.isNew) {
    if (!this._password) {
      this.invalidate('local.password', 'required');
    }
    if (this._password.length < 6) {
      this.invalidate('local.password', 'must be at least 6 characters.');
    }
    if (this._password !== this._passwordConfirmation) {
      this.invalidate('local.passwordConfirmation', 'must match confirmation.');
    }
  }
}, null);

userSchema.path('local.email').validate(function(email) {
  if (!validator.isEmail(email)) {
    this.invalidate('local.email', 'must be a valid email address');
  }
}, null);

/* Modify JSON output */

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("User", userSchema);
