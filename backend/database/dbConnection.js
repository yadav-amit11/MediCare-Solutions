import mongoose from "mongoose";
export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_MediCare_Solutions",
    })
    .then(() => {
        console.log("Connected to MERN_MediCare_Solutions database");
    })
    .catch((err) => {
        console.log(`Some error occurred while connecting to DB: ${err}`);
    });
};