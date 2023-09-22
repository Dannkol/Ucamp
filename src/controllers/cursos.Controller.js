import { getCoursesName, getClasesName } from "../models/Curso.Model.js";

const getCoursesNameId = async (req, res) => {
    try {
        const data = await getCoursesName()
        res.status(200).json(data);
    } catch (error) {
        console.error();
    } finally {
        res.end()
    }
}


const getClasesNameId = async (req, res) => {
    try {
        const data = await getClasesName()
        res.status(200).json(data);
    } catch (error) {
        console.error();
    } finally {
        res.end()
    }
}


export { getCoursesNameId , getClasesNameId }