
import User from "../model/userSchema.js";


export const userSignup = async(request, response)=>{
    try{
        const exist = await User.findOne({username: request.body.username})
        if(exist){
            return response.status(401).json({message: 'username already exist'})
        }

        const user = request.body;
        const newUser = new User(user)
        await newUser.save()
        response.status(200).json({message: user})
    }catch(error){
        response.status(500).json({message: error.message})
    }
}

export const userLogin = async(req, res) =>{
    const {username, password} = req.body;

    if(!username || !password){  //if any of the field is Empty...
        return res.status(400).json({error:"Plz filled the Data properly"});
    };
    try{
        let token;
        const userLogin = await User.findOne({username,password});
        //console.log(userLogin);
     
        token = await userLogin.generateAuthToken();
    
        res.cookie('jwtoken',token,{
            expires: new Date(Date.now()+ 253034600),
            httpOnly: true,
        })
       
        if(userLogin){
            return res.status(200).json({data:userLogin,message:'User LoggedIn Successfully'});
        }else{
            return res.status(401).json({message:'Bad or Invalid Request'});
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const userData = async(req,res)=>{

    // console.log(!req.rootUser);
     if(!req.rootUser){
          res.send("Please login first")
     }else{
      res.send(req.rootUser)
     }
      
  }

  export const userLogout = async(req,res)=>{
    //console.log(`helllo my Logout Page`);
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('User Logout Successfull');
}