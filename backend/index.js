const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();
const pinRoutes = require("./routes/pins")
const userRoutes = require("./routes/users")

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, 
    {useNewUrlParser: true,
    useUnifiedTopology: true}
    ).then(() => {
    console.log("Mongodb connected")
}).catch(err=>console.log(err ));


app.use(express.json())

app.use("/api/pins" , pinRoutes)
app.use("/api/users" , userRoutes)

app.listen(8800 , () => {
    console.log("Backend server is running!")
})