import { ObjectId } from "mongodb";
import { deletcourses, addmylist, deletMyList, getCoursesName, getClasesName, getAllClasesByIds, getAllCourse, mylist } from "../models/Curso.Model.js";

const getCoursesNameId = async (req, res) => {
  try {
    const data = await getCoursesName(req.user.identificador)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'error al obtener los cursos'
    })
  } finally {
    res.end()
  }
}

const deletMyListController = async (req, res) => {
  try {
    const data = await deletMyList(req.params.idcourse, req.user.identificador)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'error al eliminar de mi lista'
    })
  } finally {
    res.end()
  }
}

const addMyListController = async (req, res) => {
  try {
    const data = await addmylist(req.params.idcourse, req.user.identificador)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'error al eliminar de mi lista'
    })
  } finally {
    res.end()
  }
}

const getClasesNameId = async (req, res) => {
  try {
    const data = await getClasesName(req.user.identificador)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'error al obtener las clases'
    })
  } finally {
    res.end()
  }
}


const getClasescontent = async (req, res) => {
  try {

    const classes = await getAllClasesByIds(req.body.clases);

    res.status(200).json(classes);

  } catch (error) {
    res.status(500).json({
      message: 'error al obtener las clases'
    })
  } finally {
    res.end();
  }
}

const getAllCoursecontent = async (req, res) => {
  try {

    const classes = await getAllCourse();

    res.status(200).json(classes);

  } catch (error) {
    res.status(500).json({
      message: 'error al obtener los cursos'
    })
  } finally {
    res.end();
  }
}

const getmylist = async (req, res) => {
  try {
    const ids = req.body.params.mylist.map(e => new ObjectId(e._id));
    const result = await mylist(ids);

    res.status(200).json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'error al obtener los cursos'
    })
  } finally {
    res.end();
  }
}

const deletmycourses = async (req, res) => {
  try {
    const data = await deletcourses(req.params.idcourse, req.user.identificador)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'error al eliminar de mi lista'
    })
  } finally {
    res.end()
  }
}

export { deletmycourses, addMyListController, deletMyListController, getmylist, getAllCoursecontent, getCoursesNameId, getClasesNameId, getClasescontent }