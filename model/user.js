import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  details: {
    company: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,

      sparse: true, // Create a sparse index on the email field
      unique: true, // Ensuring the email field is unique
    },
    mobile: {
      type: Number,
      required: false,
    },
    GST: {
      type: String,
      required: false,
    },
    isMFA: {
      type: Boolean,
      default: false,
    },
    authEmail: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
  },
  invoices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Invoice" }],
  refreshToken: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;
