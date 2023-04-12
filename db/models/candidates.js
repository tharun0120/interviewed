const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const candidateSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
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
    blobURL: {
      type: String,
    },
    hr_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "hr",
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

candidateSchema.methods.generateAuthToken = async function () {
  const candidate = this;

  const token = jwt.sign(
    { _id: candidate.id.toString() },
    process.env.JWT_SECRET
  );
  candidate.tokens = candidate.tokens.concat({ token });
  await candidate.save();

  return token;
};

candidateSchema.methods.toJSON = function () {
  const candidate = this;
  const candidateObject = candidate.toObject();

  delete candidateObject.password;

  return candidateObject;
};

candidateSchema.statics.findByCredentials = async (email, password) => {
  const candidateObject = await candidates.find({ email });

  if (candidateObject.length === 0) {
    throw new Error("No such User found");
  }

  let resultObject;

  for (let index = 0; index < candidateObject.length; index++) {
    const element = candidateObject[index];

    const isMatch = await bcrypt.compare(password, element.password);

    if (isMatch) {
      resultObject = element;
      break;
    }
  }

  if (!resultObject) {
    throw new Error("Invalid password");
  }

  return resultObject;
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
