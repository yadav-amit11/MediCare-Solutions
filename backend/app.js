import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messagRouter.js"
import { sendMessage } from "./controller/messageController.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";

const app = express();

config({ path: "./config/config.env" });

// CORS config. to allow requests from specific origins and methods
app.use(
    cors({
        origin: [process.env.FRONTEND_ADMIN_URL, process.env.DASHBOARD_URL],
        methods:["GET","POST","DELETE","PUT"],
        credentials:true,
    })
);
// Middleware
app.use(cookieParser()); //parses cookies attached to the client request object. It allows you to easily access and manipulate cookies sent by the client.
app.use(express.json()); // parses incoming JSON requests and makes the parsed data available in req.body
app.use(express.urlencoded({extended:true})); // parses incoming requests with URL-encoded payloads (typically form submissions) and makes the parsed data available in req.body.

//file handling middlewares
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}));
app.use('/api/v1/message',messageRouter);
app.use('/api/v1/user',userRouter);
dbConnection();

app.use(errorMiddleware);
export default app;
