const express  = require("express");
const dotenv = require("dotenv");
const DBConnection = require("./config/DBConnection");
const authRouter = require("./Routes/authRouter");
const cookieParser = require('cookie-parser');
const adsRouter = require("./Routes/adsRouter");
const categoryRouter = require("./Routes/categoryRouter");
const userRouter = require("./Routes/userRouter");
const adminRouter = require("./Routes/adminRouter");
const app = express();
const  cors = require('cors')
const morgan = require('morgan')
const cloudinary = require('cloudinary').v2;    


dotenv.config();
app.use(cookieParser());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))

app.use(morgan('dev'))


app.use(cors({
    origin:'http://localhost:3000', 
    credentials:true,          
}))

cloudinary.config({
    cloud_name: process.env.Cloudinary_Name,
    api_key: process.env.Cloudinary_Key,
    api_secret: process.env.Cloudinary_Secret,
  });



// API
app.use("/api/auth",authRouter);
app.use("/api/annonce",adsRouter);
app.use("/api/category",categoryRouter);
app.use("/api/user",userRouter);
app.use("/api/admin",adminRouter);







const port = process.env.PORT || 1000;
app.listen(port, ()=>{
console.log(`Server connected on port ${port}`)
DBConnection();

});