// pages/api/products.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });

    res.status(200).json(products.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
