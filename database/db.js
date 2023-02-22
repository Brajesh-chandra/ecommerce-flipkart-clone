import mongoose from "mongoose";

export const Connection = async(URL)=>{
    
    try{
        await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser:true})
        console.log('Database connection successsful');
    }catch(error){
        console.log('error while connecting with database ', error.message);
    }
}
