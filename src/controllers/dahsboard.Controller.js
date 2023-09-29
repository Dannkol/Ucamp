import { findUser } from "../models/UserModel.js"

const getUser = async (req, res) =>{
    try {
        const user = await findUser(req.user);
        console.log(user);
        res.status(200).json({
            message : {
                id : user.identifier,
                username : user.username,
                email : user.email,
                rol : user.rol,
                courses : user.courses,
                learning : user.learning,
                points : user.points
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'error al obtener el usuario'
          })
    }finally{
        res.end()
    }
}

export { getUser }