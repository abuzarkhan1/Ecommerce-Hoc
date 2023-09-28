const Flutterwave = require ("flutterwave-node-v3");

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const checkout = async (req, res) => {
  const option = {
    name:"abuzar",
    // amount: 2000,
    currency: "NGN",
    interval: "monthly",
  };
  const order = await flw.PaymentPlan.create(option);
  console.log(order);
  res.json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  const { OrderId, paymentId } = req.body;
  console.log("OrderId = ",OrderId, "paymentId =", paymentId);
  res.json({
    OrderId,
    paymentId,
  });
};

module.exports = {
  checkout,
  paymentVerification,
};
