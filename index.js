const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors")
const cookieParser = require('cookie-parser');


// ================= Config File ==================
dotenv.config({path:"config.env"})

// ================== connection DB =============== 
const connDB = require('./db/connection.js');
connDB()

const app = express();
app.use(express.json())
app.use(cookieParser());

app.listen(7000)

app.get('/',(req,res)=>{
    res.send("<h1 style='color:purple'>Outfil - Hill Backend</h1>")
})

// =================== cors ========================
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
 }

app.use(cors(corsOptions))


// ===================== Routes =======================
const userRoutes = require('./routes/userRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const contactRoutes = require('./routes/contactRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js')

app.use(userRoutes)
app.use(productRoutes)
app.use(contactRoutes)
app.use(orderRoutes)

console.log("Sever is running at http://localhost:7000")

