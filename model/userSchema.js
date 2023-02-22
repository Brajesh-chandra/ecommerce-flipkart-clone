import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required: true,
        trim: true,
        min: 4,
        max: 20
    },
    lastname:{
        type:String,
        required: true,
        trim: true,
        min: 4,
        max: 20
    },
    username:{
        type:String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String
    },
    tokens : [
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
})


userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('user', userSchema)

export default User;