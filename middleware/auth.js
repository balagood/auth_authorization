import jwt from 'jsonwebtoken'

export const validateToken = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        res.status(403)
        res.json({message:"Token Required to proceed"})
        return
    }

    try{
        req.user = jwt.verify(token,process.env.JWT_SECRET)
        next()
    }
    catch(err){
        res.status(403)
        res.json({message:"Token Required to proceed"})
        return
    }
} 