const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Handle payment processing
const processPayment = async (req, res) => {
  try {
    const { amount, currency, description, source } = req.body;

    // Create a charge using Stripe API
    const charge = await stripe.charges.create({
      amount,
      currency,
      description,
      source, // Stripe token or card details
    });

    res.status(200).json({ message: "Payment successful!", charge });
  } catch (error) {
    console.error("Error processing payment:", error.message);
    res.status(500).json({ error: "Payment failed" });
  }
};

module.exports = {
  processPayment,
};
