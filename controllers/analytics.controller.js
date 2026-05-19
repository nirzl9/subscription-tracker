import subscriptionSchema from "../models/subscription.model.js";

export const getAnalytics = async (req, res, next) => {
  try {
    const [
      totalSubscriptions,
      activeSubscriptions,
      cancelledSubscriptions,
      expiredSubscriptions,
    ] = await Promise.all([
      Subscription.countDocuments(),
      Subscription.countDocuments({ status: "active" }),
      Subscription.countDocuments({ status: "cancelled" }),
      Subscription.countDocuments({ status: "expired" }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalSubscriptions,
        activeSubscriptions,
        cancelledSubscriptions,
        expiredSubscriptions,
      },
    });
  } catch (err) {
    next(err);
  }
};
