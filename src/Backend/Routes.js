const express=require('express')
const route=express.Router()
const Feedback=require("./Databaseschema");


route.post('/feedback', async(req, res) => {
    const {username,Email,feedbacktext,rating}=req.body
    try{
    const newFeedback = new Feedback({ username, Email, feedbacktext,rating })
  const data=await newFeedback.save()
  res.status(200).json(data);
    }
    catch(err){
    console.error("Error saving feedback:", err);
    res.status(500).json({ error: 'Something went wrong' });
    }
});


route.get('/feedback',async(req,res)=>{
    try {
    const feedbackList = await Feedback.find();
    res.status(200).json(feedbackList);
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});
   module.exports= route

