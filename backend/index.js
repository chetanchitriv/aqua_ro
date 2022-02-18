const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")
const dotenv=require("dotenv")
const bodyparser = require("body-parser")
const port = process.env.PORT
dotenv.config()

mongoose.connect(
    process.env.MONGO_URI,
    // "mongodb://127.0.0.1/aquvarro",
    {useUnifiedTopology:true,useNewUrlParser:true},
    ()=>{
        console.log("mongo Db connected");
    }
)

app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

var corsOptions = {
    origin: "*"
  };
  
  app.use(cors(corsOptions));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "*")
    }
    next()
})
app.get("/", (req, res)=>{
    res.send("server is live at 4000")
})



const userRouts=require("./routes/user")
const userPasswordRouts=require("./routes/changepassword")
const authRoute=require("./routes/auth")
const stockRoute=require("./routes/stockRouter")
const teamAllotRoute=require("./routes/teamAllotRout")
const notificationRoute = require("./routes/notification")
const graphRouth=require("./routes/graphRoute")
const stockTechRougth=require("./routes/stockTechRouter")
const leadRoute=require("./routes/lead")
const invoiceRoute=require("./routes/invoice_pdfRouter")
const complaintRoute=require("./routes/complaint")

app.use("/api/users",userRouts)
app.use("/api/users/changepassword",userPasswordRouts)
app.use("/api/invoice",invoiceRoute)
app.use('/api/teams',teamAllotRoute)
app.use('/api/notification',notificationRoute)
app.use("/api/login",authRoute)
app.use("/api/graph",graphRouth)
app.use('/api/leads',leadRoute)
app.use('/api/stock',stockRoute)
app.use('/api/stocktech',stockTechRougth)
app.use('/api/complaints',complaintRoute)

app.listen(4000,()=>{
    console.log("server started at port 4000");
} )