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
                    id: '$courses._id',
                    curso: '$courses.title',
                },
            },
            {
                $match: {
                    $or: [{ id: { $exists: true, $ne: null } }],
                },
            },
        ];

        const result = await users.aggregate(pipeline).toArray();

        const transformedArray = [];

        // Iteramos sobre el array de entrada
        result.forEach((item) => {
          // Si ambos campos id y curso no están vacíos
          if (item.id.length > 0 && item.curso.length > 0) {
            // Iteramos sobre los elementos en los campos id y curso y creamos un nuevo objeto para cada par
            item.id.forEach((id, index) => {
              transformedArray.push({ id: id.toString(), curso: item.curso[index] });
            });
          }
        });
        return transformedArray

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
            },
            {
                $group: {
                    _id: "$classes._id",
                    classes: { $first: "$classes" }
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

        const result = await users.findOneAndUpdate(query, pipeline);

        return result

    } catch (error) {
        /* console.error(JSON.stringify(error.errInfo, null, 2)); */
        throw error;
    } finally {
        await client.close();
    }
}

export { getCoursesName, getClasesName, getAllClasesByIds, createNewCourse }