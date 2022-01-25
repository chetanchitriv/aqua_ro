const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")
const dotenv=require("dotenv")
const bodyparser = require("body-parser")

dotenv.config()

mongoose.connect(
    process.env.MONGO_URI,
    {useUnifiedTopology:true,useNewUrlParser:true},
    ()=>{
        console.log("mongo Db connected");
    }
)

// app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

var corsOptions = {
    origin: "*"
  };
  
  app.use(cors(corsOptions));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "*")
    }
    next()
})

const userRouts=require("./routes/user")
const authRoute=require("./routes/auth")
const leadRoute=require("./routes/lead")
const complaintRoute=require("./routes/complaint")

app.use("/api/users",userRouts)
app.use("/api/login",authRoute)
app.use('/api/leads',leadRoute)
app.use('/api/complaints',complaintRoute)

app.listen(4000,()=>{
    console.log("server started at port 4000");
} )