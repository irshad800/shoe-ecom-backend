const { error } = require("console")
const experess = require("express")
const app = experess()
const mongoose = require("mongoose")
 const { url } = require("inspector")
const { urlencoded } = require("body-parser")
const product_routes = require("./routes/product_routes")
const staff_routes = require("./routes/staff_routes")
const authRouter = require("./routes/auth_routes")
const cartrouts = require("./routes/cart_routes")

const wishrouts = require("./routes/wishlist_routes")
const orderRoutes = require("./routes/order_routes")
require ('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Database Connected");
}).catch((error) => {
    console.log(error)
})
app.use(experess.json())
app.use(experess.urlencoded({
    extended: true  
}))
app.use("/api/order",orderRoutes)
app.use("/api/product", product_routes)
app.use("/api/staff", staff_routes)
app.use("/api/auth",authRouter)
app.use("/api/cart",cartrouts)
app.use("/api/Wish",wishrouts)






//routing structure
//syntax:app.method(path,handler)=>resource.send(response)
app.get("/", (req, res) => {
    res.send("hello")
}
)
app.get("/add", (req, res) => {
    res.send("hi")
}
)
app.get("/a", (req, res) => {
    res.send("a")
}
)
app.get("/b", (req, res) => {
    res.send("b")
}
)
app.listen(process.env.PORT, () => {
    console.log('server started')
})


