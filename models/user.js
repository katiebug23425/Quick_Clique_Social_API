const { Schema, model, Types } = require('mongoose'); 

const userSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: { 
        validator: function(v) {
            return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
        }
    }
  },

  friends:[
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
  }
],
  thoughts:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
  }
],
},
{
  toJSON: {
    virtuals: true, // Enables virtual properties
  },
  id: false, // Disables the virtual 'id' property
}
);

// Defining a virtual property 'friendCount' which returns the number of friends in the friends array
userSchema.virtual('friendCount').get(function(){
  return this.friends.length;
});

// Creating the User model from the userSchema
const User = model('User',userSchema)

// Exporting the User model as a module
module.exports = User