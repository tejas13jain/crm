const express   = require("express");
const mongoose  = require("mongoose");
const dotenv    = require("dotenv");
const cors      = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// connect mongo
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(()=> console.log("MongoDB connected"))
  .catch(err => console.error("Mongo connect err:", err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
