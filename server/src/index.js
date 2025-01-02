const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const app = express();
const AuthRoute = require("./routes/AuthRoute");
const UserRoute = require("./routes/UserRoute");
const BranchRoute = require("./routes/BranchRoute");
const ProductRoute = require("./routes/ProductRoute");
const SalesRoute = require("./routes/SaleRoute");
const PurchaseRoute = require("./routes/PurchaseRoute");
const CategoryRoute = require("./routes/CategoryRoute");

dotenv.config();

const PORT = process.env.PORT;

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use("/auth", AuthRoute);
app.use("/users", UserRoute);
app.use("/branch", BranchRoute);
app.use("/product", ProductRoute);
app.use("/sales", SalesRoute);
app.use("/purchase", PurchaseRoute);
app.use("/category", CategoryRoute);

app.listen(PORT, () => {
    console.log("Express API running on port " + PORT);
});
