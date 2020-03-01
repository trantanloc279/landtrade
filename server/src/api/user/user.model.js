import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // refresh every time user sign in app
    nonce: {
      type: Number,
      default: Math.floor(Math.random() * 10000)
    },
    publicAddress: {
      type: String,
      validate: {
        validator: function(address) {
          return /^(0x){1}[0-9a-fA-F]{40}$/i.test(address);
        },
        message: props => `${props.value} is not a valid public address`
      },
      required: [true, "Public address is required"],
      unique: [true, "Public address is unique"],
      required: [true, "Public address is required"],
      trim: true,
      index: true
    },
    fullName: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      enum: ["government", "natory", "owner"],
      default: "owner"
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "Email is unique"],
      sparse: true //prevent duplicate value but allow multiple null
    },
    isVerifired: {
      type: Boolean,
      default: false
    },
    idNumber: {
      type: String,
      index: true,
      trim: true,
      unique: [true, "ID number is unique"],
      sparse: true //prevent duplicate value but allow multiple null
    },
    phoneNumber: {
      type: Number,
      trim: true
    },
    properties: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cetification"
      }
    ],
    avatar: {
      type: String,
      default: `avt_${Math.floor(Math.random() * 10) + 1}.png` //generate default avatar
    }
  },
  { timestamps: true }
);

export default mongoose.model("User5", userSchema);
