import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({ subscription, success: true, Data: subscription });
  } catch (err) {
    next(err);
  }
};

export const getSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const err = new Error("Unauthorized access");
      err.status = 403;
      throw err;
    }
    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ subscriptions, success: true, Data: subscriptions });
  } catch (err) {
    next(err);
  }
};

export const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const err = new Error("Subscription not found");
      err.status = 404;
      throw err;
    }

    if (subscription.user.id !== req.user._id) {
      const err = new Error("Unauthorized access");
      err.status = 403;
      throw err;
    }

    res.status(200).json({ subscription, success: true, Data: subscription });
  } catch (err) {
    next(err);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const err = new Error("Subscription not found");
      err.status = 404;
      throw err;
    }

    if (subscription.user.id !== req.user._id) {
      const err = new Error("Unauthorized access");
      err.status = 403;
      throw err;
    }

    Object.assign(subscription, req.body);
    await subscription.save();

    res.status(200).json({ subscription, success: true, Data: subscription });
  } catch (err) {
    next(err);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      const err = new Error("Subscription not found");
      err.status = 404;
      throw err;
    }

    if (subscription.user.id !== req.user._id) {
      const err = new Error("Unauthorized access");
      err.status = 403;
      throw err;
    }
    res.status(200).json({ success: true, message: "Subscription deleted" });
  } catch (err) {
    next(err);
  }
};

export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({
      renewalDate: { $gt: new Date() },
    }).sort({ renewalDate: 1 });

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      subscriptions,
    });
  } catch (err) {
    next(err);
  }
};
