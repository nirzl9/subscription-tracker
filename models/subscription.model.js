import mongoose, { trusted } from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      trim: true,
      uppercase: true,
      enum: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },

    category: {
      type: String,
      enum: ["entertainment", "productivity", "education", "health", "other"],
      default: "other",
      required: [true, "Category is required"],
    },

    paymentMethod: {
      type: String,
      enum: ["credit_card", "debit_card", "paypal", "bank_transfer"],
      default: "credit_card",
    },

    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },

    startdate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date cannot be in the future",
      },
    },

    renewaldate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startdate();
        },
        message: "Renewal date must be after the start date",
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

subscriptionSchema.pre("save", function (next) {
  if (this.renewaldate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewaldate = new Date(this.startdate);
    this.renewaldate.setDate(
      this.startdate.getDate() + renewalPeriods[this.frequency],
    );
  }

  if (this.renewaldate < new Date()) {
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
