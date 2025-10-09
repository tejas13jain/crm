const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true, unique: true },  
  title: { type: String, required: true },               
  logo: { type: String, default: "" },                   
  favicon: { type: String, default: "" },                 
  number: { type: String, default: "" },                 
  address: { type: String, default: "" },                 
  facebook: { type: String, default: "" },                
  twitter: { type: String, default: "" },                 
  insta: { type: String, default: "" },                   
  youtube: { type: String, default: "" },                 

  updatedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",        
    default: null
  }
}, 
{ timestamps: true }); 

module.exports = mongoose.model("Setting", settingSchema);

