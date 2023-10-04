import { ObjectId } from "mongodb";
import { mongoConn, getDB } from "../config/connection.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { deletAny } from "./DelateFiled.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const getCoursesName = async (id) => {
  const client = await mongoConn();
  try {
    const db = getDB("uCamp_db");
    const users = await db.collection("users");
    const pipeline = [
      {
        $match: {
          identifier: id,
        },
      },
      {
        $project: {
          _id: 0,
          id: "$courses._id",
          curso: "$courses.title",
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
          transformedArray.push({
            id: id.toString(),
            curso: item.curso[index],
          });
        });
      }
    });
    return transformedArray;
  } catch (error) {
    return null;
  } finally {
    await client.close();
  }
};

const getClasesName = async (id) => {
  const client = await mongoConn();
  try {
    const db = getDB("uCamp_db");
    const users = await db.collection("users");
    const pipeline = [
      {
        $unwind: "$courses",
      },
      {
        $match: {
          identifier: id,
        },
      },
      {
        $unwind: "$courses.classes",
      },
      {
        $group: {
          _id: { id: "$courses.classes._id", clase: "$courses.classes.title" },
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id.id",
          clase: "$_id.clase",
        },
      },
    ];

    const result = await users.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    return null;
  } finally {
    await client.close();
  }
};

const uploadRol = async (user) => {
  const client = await mongoConn();
  try {
    const db = getDB("uCamp_db");
    const users = await db.collection("users");
    
    const updateDocument = {
      $set: {
        rol: 0,
      },
    };

    await users.updateOne({ identifier: user }, updateDocument);

    return {
      message: "Ahora eres un usuario creador de cursos"
    }

  } catch (error) {
    return null;
  } finally {
    client.close();
  }
}

const getAllClasesByIds = async (data) => {
  const client = await mongoConn();
  try {
    const db = getDB("uCamp_db");
    const users = await db.collection("users");

    const query = data.map((id) => new ObjectId(id));

    const pipeline = [
      {
        $unwind: "$courses",
      },
      {
        $unwind: "$courses.classes",
      },
      {
        $match: {
          "courses.classes._id": {
            $in: query,
          },
        },
      },
      {
        $project: {
          _id: 0,
          classes: "$courses.classes",
        },
      },
      {
        $group: {
          _id: "$classes._id",
          classes: { $first: "$classes" },
        },
      },
    ];

    const result = await users.aggregate(pipeline).toArray();

    return result;
  } catch (error) {
    return null;
  } finally {
    await client.close();
  }
};

const createNewCourse = async (data, iduser) => {
  const client = await mongoConn();
  try {
    const db = getDB("uCamp_db");
    const users = await db.collection("users");

    const query = { identifier: iduser };

    const pipeline = {
      $push: {
        courses: data,
      },
    };

    const result = await users.findOneAndUpdate(query, pipeline);

    return result;
  } catch (error) {
    /* console.error(JSON.stringify(error.errInfo, null, 2)); */
    throw error;
  } finally {
    await client.close();
  }
};

const createNewClase = async (data) => {
  const client = await mongoConn();
  try {
    const db = getDB("uCamp_db");
    const users = await db.collection("users");

    const query = { "courses._id": new ObjectId(data.curso) };

    const clase = {
      _id: data._id,
      title: data.title,
      summary: data.summary,
      content: [data.content[0], data.content[1]],
      update_date: data.update_date,
    };

    const pipeline = {
      $addToSet: {
        "courses.$.classes": clase,
      },
    };

    const result = await users.updateOne(query, pipeline);

    return result;
  } catch (error) {
    /* console.error(JSON.stringify(error.errInfo, null, 2)); */
    throw error;
  } finally {
    await client.close();
  }
};

const getAllCourseByid = async (data) => {
  const client = await mongoConn();
  try {
    const db = getDB("uCamp_db");
    const users = await db.collection("users");

    const results = await users.findOne(
      {
        courses: {
          $elemMatch: {
            _id: new ObjectId(data),
          },
        },
      },
      {
        projection: {
          _id: 0,
          "courses.$": 1,
        },
      }
    );

    return results;
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
};

const getAllCourse = async () => {
  const client = await mongoConn();
  try {
    const db = getDB("uCamp_db");
    const users = await db.collection("users");

    const results = await users
      .find(
        {},
        {
          projection: {
            _id: 0,
            courses: 1,
          },
        }
      )
      .toArray();

    return results;
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
};

const mylist = async (id) => {
  const client = await mongoConn();
  try {
    const db = getDB("uCamp_db");
    const users = await db.collection("users");

    const results = await users
      .aggregate([
        {
          $match: {
            "courses._id": {
              $in: id,
            },
          },
        },
        {
          $project: {
            _id: 0,
            courses: 1,
          },
        },
      ])
      .toArray();

    return results;
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
};

const addmylist = async (id, iduser) => {
  const client = await mongoConn();
  try {
    const db = getDB("uCamp_db");
    const users = await db.collection("users");

    const newCourse = {
      _id: new ObjectId(id),
      status: 0,
    };

    const updateOperation = {
      $push: {
        "learning.courses": newCourse,
      },
    };

    const results = await users.updateOne(
      { identifier: iduser },
      updateOperation
    );

    return results;
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
};

const deletMyList = async (id, iduser) => {
  const client = await mongoConn();
  try {
    const db = getDB("uCamp_db");
    const users = await db.collection("users");

    const updateOperation = {
      $pull: {
        "learning.courses": { _id: new ObjectId(id) },
      },
    };
    await users.updateOne({ identifier: iduser }, updateOperation);

    return {
      message: "ok",
    };
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
};

const deletcourses = async (id, iduser) => {
  const client = await mongoConn();
  try {
    const db = getDB("uCamp_db");
    const users = await db.collection("users");

    const updateOperation = {
        $pull: {
            'courses': { _id: new ObjectId(id) },
        },
    };
    const curso = await users.findOne(
        {
          courses: {
            $elemMatch: {
              _id: new ObjectId(id),
            },
          },
        },
        {
          projection: {
            _id: 0,
            "courses.$": 1,
          },
        }
      );;
    
    await users.updateOne({ identifier: iduser }, updateOperation)

    let fields = [];
    fields.push(path.join(__dirname + `../../uploads/${curso.courses[0].content}`));
    curso.courses[0].classes.forEach((e) =>
      e.content.forEach((element) => {
        fields.push(path.join(__dirname + `../../uploads/${element}`));
      })
    );

    let filesDeleted = await deletAny(fields);
    if (!(filesDeleted < fields.length)) {
      throw error
    } 
    fields = []
    return {
      message: "ok",
    };
  } catch (error) {
    throw error;
  } finally {
    client.close();
  }
};

export {
  uploadRol,
  deletcourses,
  addmylist,
  getAllCourse,
  getCoursesName,
  getClasesName,
  getAllClasesByIds,
  createNewCourse,
  createNewClase,
  getAllCourseByid,
  mylist,
  deletMyList,
};
