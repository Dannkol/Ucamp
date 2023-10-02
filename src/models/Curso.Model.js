import { ObjectId } from "mongodb";
import { mongoConn, getDB } from "../config/connection.js";
import axios from 'axios'

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

const createNewCourse = async (data, iduser) => {
    const client = await mongoConn();
    try {
        const db = getDB("uCamp_db")
        const users = await db.collection('users')

        console.log(iduser);

        const query = { identifier: iduser }


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

const createNewClase = async (data) => {
    const client = await mongoConn();
    try {
        const db = getDB("uCamp_db")
        const users = await db.collection('users')

        const query = { "courses._id": new ObjectId(data.curso) }


        const clase = {
            _id: data._id,
            title: data.title,
            summary: data.summary,
            content: [
                data.content[0],
                data.content[1]
            ],
            update_date: data.update_date
        }

        const pipeline = {
            $addToSet: {
                "courses.$.classes": clase
            }
        }

        const result = await users.updateOne(query, pipeline);

        return result

    } catch (error) {
        /* console.error(JSON.stringify(error.errInfo, null, 2)); */
        throw error;
    } finally {
        await client.close();
    }
}

const isValidObjectId = (value) => {
    if (typeof value === 'string' && value.length === 24) {
      return /^[0-9a-fA-F]{24}$/.test(value);
    }
    return false;
  };


const getAllCourseByid = async (data) => {
    const client = await mongoConn();
    try {
        const db = getDB("uCamp_db")
        const users = await db.collection('users')

        if (!isValidObjectId(data)) {
            try {
                const response = await axios.get('http://192.168.1.8:5101/cursos', {
                  params: { course: 'react' }
                });
                return response.data;
              } catch (error) {
                console.error('Error al realizar la solicitud HTTP:', error);
                throw error;
              }
        }

        const results = await users.findOne(
            {
                "courses": {
                    $elemMatch: {
                        "_id": new ObjectId(data)
                    }
                }
            },
            {
                projection: {
                    "_id": 0,
                    "courses.$": 1
                }
            }
        );

        return results

    } catch (error) {
        throw error;
    } finally {
        await client.close();
    }
}


const getAllCourse = async () => {
    const client = await mongoConn();
    try {
        const db = getDB("uCamp_db")
        const users = await db.collection('users')


        const results = await users.find(
            {},
            {
                projection: {
                    "_id": 0,
                    "courses": 1
                }
            }
        ).toArray();

        return results

    } catch (error) {
        throw error;
    } finally {
        await client.close();
    }
}

const mylist = async (id) => {
    const client = await mongoConn();
    try {
        const db = getDB("uCamp_db");
        const users = await db.collection('users');

        const results = await users.aggregate([
            {
                $match: {
                    "courses._id": {
                        $in: id
                    }
                }
            },
            {
                $project: {
                    "_id": 0,
                    "courses": 1
                }
            }
        ]).toArray();

        return results;

    } catch (error) {
        throw error;
    } finally {
        await client.close();
    }
};


const deletMyList = async (id) => {

    const client = await mongoConn();
    try {
        const db = getDB("uCamp_db");
        const users = await db.collection('users');

        const results = await users.aggregate([
            {
                $match: {
                    "courses._id": {
                        $in: id
                    }
                }
            },
            {
                $project: {
                    "_id": 0,
                    "courses": 1
                }
            }
        ]).toArray();

        console.log(results[0].courses);
        return results;

    } catch (error) {
        throw error;
    } finally {
        await client.close();
    }
}


export { getAllCourse, getCoursesName, getClasesName, getAllClasesByIds, createNewCourse, createNewClase, getAllCourseByid, mylist }