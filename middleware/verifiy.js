export const validateToken = (...token)=>{
    return (req,res,next) =>  {
        if(!token.includes(req)){
            res.status(403)
            res.json({message:"Access denied"})
            return
        }
        next()
    }
}