const colors = require('colors');
const path = require('path');
const express = require('express');
const cors = require("cors")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');


// API Routes
const userRoutes = require('./routes/userRoutes')
const storeRoutes = require('./routes/storeRoutes')
const orderRoutes = require('./routes/orderRoutes')
const productRoutes = require('./routes/productRoutes')
const mainCategoryRoutes = require('./routes/mainCategoryRoutes')
const subCategoryRoutes = require('./routes/subCategoryRoutes')
const subSubCategoryRoutes = require('./routes/subSubCategoryRoutes')
const eventRoutes = require('./routes/eventRoutes')
const couponRoutes = require('./routes/couponCodeRoutes')
const stripePaymentRoutes = require('./routes/stripePaymentRoutes')
const conversationRoutes = require("./routes/conversationRoutes")
const messageRoutes = require("./routes/messageRoutes")





connectDB();

const app = express();

app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const http = require('http');
const socketIO = require('socket.io');
const Message = require('./models/messageModel');

const server = http.createServer(app);
const io = socketIO(server);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


app.use('/', express.static("uploads"));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', mainCategoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/sub-subcategories', subSubCategoryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payment', stripePaymentRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});