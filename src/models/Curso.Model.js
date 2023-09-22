import { ObjectId } from "mongodb";
import { mongoConn, getDB } from "../config/connection.js";

const getCoursesName = async () => {
    const client = await mongoConn();
    try {
        const db = getDB("uCamp_db")
        const users = await db.collection('users')
        const pipeline = [
            {
                $project: {
                    _id: 0,
                    id: { $arrayElemAt: ['$courses._id', 0] },
                    curso: { $arrayElemAt: ['$courses.title', 0] }
                }
            },
            {
                $match: {
                    $or: [
                        { id: { $exists: true, $ne: null } },
                        { curso: { $exists: true, $ne: null } }
                    ]
                }
            }
        ];


        const result = await users.aggregate(pipeline).toArray();
        return result

    } catch (error) {
        return null
    } finally {
        await client.close();
    }
}

const getClasesName = async () => {
    const client = await mongoConn();
    try {
        const db = getDB("uCamp_db")
        const users = await db.collection('users')
        const pipeline = [
            {
                $unwind: "$courses"
            },
            {
                $unwind: "$courses.classes"
            },
            {
                $group: {
                    _id: { id: "$courses.classes._id", clase: "$courses.classes.title" },
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$_id.id",
                    clase: "$_id.clase"
                }
            }
        ];



        const result = await users.aggregate(pipeline).toArray();
        return result

    } catch (error) {
        return null
    } finally {
        await client.close();
    }
}


const getAllClasesByIds = async (data) => {
    const client = await mongoConn();
    try {
        const db = getDB("uCamp_db")
        const users = await db.collection('users')

        const query = data.map((id) => new ObjectId(id))


        const pipeline = [
            {
                $unwind: "$courses"
            },
            {
                $unwind: "$courses.classes"
            },
            {
                $match: {
                    "courses.classes._id": {
                        $in: query
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    "classes": "$courses.classes"
                }
            }
        ]

        const result = await users.aggregate(pipeline).toArray();

        return result

    } catch (error) {
        return null
    } finally {
        await client.close();
    }
}

const createNewCourse = async (data) => {
    const client = await mongoConn();
    try {
        const db = getDB("uCamp_db")
        const users = await db.collection('users')

        const query = { identifier: "fasdfwsfew5343123oj3254" }


        const pipeline = {
            $push: {
                courses: data
            }
        }

        const result = await users.updateOne(query, pipeline);

        return result

    } catch (error) {
        console.error(JSON.stringify(error.errInfo, null, 2));
        return null;
    } finally {
        await client.close();
    }
}

export { getCoursesName, getClasesName, getAllClasesByIds , createNewCourse }