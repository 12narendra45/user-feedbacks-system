const mongoose=require('mongoose')
const Databaseschema=new mongoose.Schema({
    username:{
    type:String
    },
    Email:{
      type:String
    },
    feedbacktext:{
         type:String
    },
    rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0 
  },
    timestamp: {
    type: Date,
    default: Date.now 
  }
});
const Feedback = mongoose.model('Feedback', Databaseschema);
module.exports = Feedback