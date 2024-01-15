const Order = require("../model/orderModel")


// =============== Create Orders ====================
exports.createOrder = async (req, res) => {
  try {
    let order = new Order(req.body)

    const order_data = await order.save()
    res.status(201).json({ order: order_data })

  } catch (error) {
    res.status(422).json({ error: error })
  }
}

// =============== User's Orders ===============

exports.getMyOrders = async (req, res) => {
  const userId = req.params.userid;

  try {
    const orders = await Order.find({ user_id: userId });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// =============== Delete Orders ===============

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).send("Order not found.");
    }

    await Order.findByIdAndRemove(orderId);
    res.status(200).json("Ordered is deleted")

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// ---- Admin controller ----
// ======================== All Orders =========================

exports.allOrders = async (req, res) => {
  try {

    const orders = await Order.find()
    res.status(200).json(orders)

    if (orders.length = 0) {
      res.status(433).json("No Orders")
    }

  } catch (error) {
    console.log(error)
  }
}

// ======================= Order update =========================

exports.orderAction = async (req, res) => {
  const { id } = req.params; 
  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    order.order_details.status = req.body.order_details.status
    order.updatedAt = new Date();

    // Save the updated order
    await order.save();

    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

