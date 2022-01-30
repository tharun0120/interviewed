const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const candidateSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid Email");
      },
    },
    password: {
      type: String,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password"))
          throw new Error("Password cannot contain password");
      },
    },
    isInterviewComplete: {
      type: Boolean,
      default: false,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    blob: {
      type: String,
    },
    hr_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "hr",
    },
  },
  {
    timestamps: true,
  }
);

candidateSchema.methods.toJSON = function () {
  const candidate = this;
  const candidateObject = candidate.toObject();

  delete candidateObject.password;

  return candidateObject;
};

candidateSchema.statics.findByCredentials = async (email, password) => {
  const candidateObject = await candidates.findOne({ email });

  if (!candidateObject) {
    throw new Error("No such User found");
  }

  const isMatch = await bcrypt.compare(password, candidateObject.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return candidateObject;
};

//Hashing Passwords
candidateSchema.pre("save", async function (next) {
  const candidate = this;

  if (candidate.isModified("password")) {
    candidate.password = await bcrypt.hash(candidate.password, 8);
  }

  next();
});

const candidates = mongoose.model("candidates", candidateSchema);

module.exports = candidates;
