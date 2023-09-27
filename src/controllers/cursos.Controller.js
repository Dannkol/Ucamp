import { getCoursesName, getClasesName, getAllClasesByIds } from "../models/Curso.Model.js";

const getCoursesNameId = async (req, res) => {
  try {
    const data = await getCoursesName()
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'error al obtener el curso'
    })
  } finally {
    res.end()
  }
}


const getClasesNameId = async (req, res) => {
  try {
    const data = await getClasesName()
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



export { getCoursesNameId, getClasesNameId, getClasescontent }