import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'


export const signUp = async(req,res) =>{
    const {name,email,password} = req.body
    const hashPassword = await bcrypt.hash(password,10)
    try{
        const user = await User.create({
            name,email,password:hashPassword
        })
        res.status(201)
        res.json({message:'User is created'})
    }
    catch(err){
        res.status(400)
        res.send({message:err.message})
    }
    
}

export const login = async (req,res) =>{
    const {email,password} = req.body

    try{
        const user = await User.findOne({email})
        if(!user){
            res.status(401)
            res.json('User is invalid')
        }

        const isPassword =  await bcrypt.compare(password,user.password)
        if(!isPassword){
            res.status(401)
            res.json('User is invalid')
        }

        const token = jwt.sign(
            {id: user._id,name:user.name,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"1hr"}
        )

        res.send({
            token:token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
    }
    catch(err){
        res.status(500)
        res.send({message:err.message})
    }
    
}


export const getId = async(req,res)=>{
    const userDetailById = await User.findById(req.user.id)
   
    if(!userDetailById){
        res.status(404)
        res.json({message:'User is not found'})
    }    

    res.send({
        "id":userDetailById._id,
        "name":userDetailById.name,
        "email":userDetailById.email,
        "createdAt":userDetailById.createdAt,
        "updatedAt":userDetailById.updatedAt
    })
}