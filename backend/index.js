import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import path from "path";
import { createServer } from "http"; // Use ES module syntax for http

dotenv.config();

const app = express();
const server = createServer(app); // Replace require with import

const PORT = process.env.PORT || 8500;

const __dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

const allowedOrigins = ["http://localhost:8000", "http://localhost:5173" ,  "http://localhost:5173" ,  "http://127.0.0.1:5500"  ]; // 127.0.0.1:5500 for live server
// Add allowed origins
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error("Not allowed by CORS")); // Block the request
        }
    },
    credentials: true // Allow cookies and credentials
};

app.use(cors(corsOptions));

// yha pr apni api ayengi
app.use("/api/v1/user", userRoute);

//app.use(express.static(path.join(__dirname, "/frontend/dist")));
// app.get("*", (req,res)=>{
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// })

server.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});