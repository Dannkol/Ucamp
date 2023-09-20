import { ObjectId } from 'bson';
import { mongoConn, getDB } from '../config/connection.js';

const findUser = async (user) => {
    const client = await mongoConn();
    try {
        const db = getDB("uCamp_db")
        const users = await db.collection('users')
        const query = {
            $or : [
                { 
                    identifier : user.identificador
                },
                {
                    username : user.username
                },
                {
                    email : user.email
                }
            ]
        }

        const result = await users.findOne(query)

        return result

    } catch (error) {
        console.error(error);
    }finally{
        await client.close();
    }
}

const NewUser = async (user) => {
    const client = await mongoConn();
    console.log('gg');
    try {
        const db = getDB("uCamp_db")
        const users = await db.collection('users')
        const query = {
            _id : new ObjectId(),
            identifier : user.identificador,
            username : user.username,
            email : user.email,
            rol : 0,
            courses : [],
            learning : {
                default : [],
                courses : []
            }
        }

        const result = await users.insertOne(query)

        return result

    } catch (error) {
        console.error(error);
    }finally{
        await client.close();
    }
}


export { findUser , NewUser }