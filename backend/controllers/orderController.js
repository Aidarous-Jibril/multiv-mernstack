const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Event = require("../models/eventModel");
const Store = require("../models/storeModel");


const createOrder = async ( req, res, next ) => {
    try {
        const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

         // group cart items by store Id
        const storeItemsMap = new Map();

        for (const item of cart) {
            const storeId = item.storeId;
            if (!storeItemsMap.has(storeId)) {
              storeItemsMap.set(storeId, []);
            }
            storeItemsMap.get(storeId).push(item);
          }

             // create an order for each shop
      const orders = [];

      for (const [storeId, items] of storeItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// get all events of a store
const getUserOrders = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});


// get all events of a store
const getStoreOrders = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ "cart.storeId": req.params.storeId }).sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get single order of store
const getSingleOrder = catchAsyncErrors(async (req, res) => {
  const order = await Order.findById(req.params.orderId)
  if (order) {
    res.status(201).json({
      success: true,
      order,
    });  } else {
    return res.status(404).json({ msg: "Product not found" });
  }
});

// update order status by store
const updateOrderStatusByStore = catchAsyncErrors(async (req, res) => {

  try {
    const order = await Order.findById(req.params.orderId)
    if (!order) {
      return res.status(404).json({ msg: "Order not found with this id" });
    }

    if (req.body.status === "Transferred to delivery partner") {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }
// console.log(req.body.status)
    order.status = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
      const serviceCharge = order.totalPrice * .10;
      await updateSellerInfo(order.totalPrice - serviceCharge);
    }

    await order.save({ validateBeforeSave: false });
    console.log("UPDATED_STATUS", order.status)
    res.status(200).json({order, success: true, msg: "Order updated successfully"});

    async function updateOrder(id, qty) {
      const product = await Event.findById(id) || await Product.findById(id);

      product.stock -= qty;
      product.sold_out += qty;

      await product.save({ validateBeforeSave: false });
    }

    async function updateSellerInfo(amount) {
      const store = await Store.findById(req.store.id);
      
      store.availableBalance = amount;

      await store.save();
    }

  } catch (error) {
    return res.status(500).json({ msg: "Product not found" });
  }
});


//refund order
const refundOrder = catchAsyncErrors(async (req, res) => {
  console.log(req.params.orderId)
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ msg: "Order not found with this id" });
    }
    order.status = req.body.status;
    console.log("ORDER:", order)

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
      msg: "Order Refund Request successfully!",
    });
  } catch (error) {
    return res.status(500).json({ msg: "Product not found" });
  }
})

// update order status by store
const refundAcceptedByStore = catchAsyncErrors(async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(400).json({ msg: "Order not found with this id" });
    }
console.log("ORDER", order)
    order.status = req.body.status;

    const refundedOrder = await order.save();

    res.status(200).json({refundedOrder, success: true, msg: "Order Refund successfull!"});

    if (req.body.status === "Refund Success") {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);

      product.stock += qty;
      product.sold_out -= qty;

      await product.save({ validateBeforeSave: false });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Product not found" });
  }
});


module.exports = {
    createOrder,
    getUserOrders,
    getStoreOrders,
    getSingleOrder,
    updateOrderStatusByStore,
    refundOrder,
    refundAcceptedByStore
}