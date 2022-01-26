const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const candidates = require("./candidates");

const HRSchema = mongoose.Schema(
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

HRSchema.virtual("candidates", {
  ref: "candidates",
  localField: "_id",
  foreignField: "hr_id",
});

HRSchema.methods.generateAuthToken = async function () {
  const hr = this;

  const token = jwt.sign({ _id: hr.id.toString() }, process.env.JWT_SECRET);
  hr.tokens = hr.tokens.concat({ token });
  await hr.save();

  return token;
};

HRSchema.methods.toJSON = function () {
  const hr = this;
  const hrObject = hr.toObject();

  delete hrObject.password;
  delete hrObject.tokens;

  return hrObject;
};

HRSchema.statics.findByCredentials = async (email, password) => {
  const hrObject = await hr.findOne({ email });

  if (!hrObject) {
    throw new Error("Unable to login: No such User found");
  }

  const isMatch = await bcrypt.compare(password, hrObject.password);

  if (!isMatch) {
    throw new Error("Unable to login: Invalid password");
  }

  return hrObject;
};

//Hashing Passwords
HRSchema.pre("save", async function (next) {
  const hr = this;

  if (hr.isModified("password")) {
    hr.password = await bcrypt.hash(hr.password, 8);
  }

  next();
});

HRSchema.pre("remove", async function (next) {
  const hr = this;
  await candidates.deleteMany({ hr_id: hr._id });
  next();
});

const hr = mongoose.model("hr", HRSchema);

module.exports = hr;
