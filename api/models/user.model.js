const mongoose= require("mongoose")
const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      profilePicture: {
        type: String,
        default:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFxqdyMtwU907xdSNdCpSmZFotzTspBW4AXFL271XB0g&s',
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );
  
  const User = mongoose.model('User', userSchema);
  
  module.exports={User}