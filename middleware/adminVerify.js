 exports.adminVerify = async (req,res,next) =>{
   try {
    const role = req.user.role;

    if(role==='user'){
        return res.status(403).json({message:"Access denied, User is not admin"})
    }
    next()

   } catch (error) {
    console.log("Error from Admin Middleware - " + error)
   }
}