import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/user')
.then(()=>console.log("database is connected"))
.catch((err)=>console.log('connection is failed:',err))

export default mongoose