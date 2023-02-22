
import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js'

const Authenticate = async(req,res,next) =>{
    let token;
    try{
        //console.log(req);
         token = req.cookies.jwtoken;

        //console.log(token);

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
       // console.log(verifyToken);
        // const rootUser = await User.findOne({_id:verifyToken._id});
        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});
         //console.log(rootUser);
        if(!rootUser){
            throw new Error('User Not Found');
        }

         //console.log(req.token);
        req.token = token;
        // console.log(req.token);
        // console.log(req.rootUser);
        req.rootUser = rootUser;
         //console.log(req.rootUser);
        //console.log(req.userID);
        req.userID = rootUser._id;
       // console.log(req.userID);

        next();


    }catch(err){
        console.log(err);
        res.status(401).send("Unauthorized: No Token Provided"); 
    }
};
export default Authenticate;