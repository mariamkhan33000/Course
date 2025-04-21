import express from 'express'
import { buyCourse, courseDetails, createCourse, deleteCourse, getAllCourses, getPurchasedCourses, updateCourse } from '../controllers/courseController.js'
import { authMiddleware } from '../middlewares/userMiddleware.js'
import { adminMiddleware } from '../middlewares/adminMiddware.js'
const router = express.Router()

router.post('/create', adminMiddleware, createCourse)
router.put('/update/:courseId',adminMiddleware, updateCourse)
router.delete('/delete/:courseId', adminMiddleware , deleteCourse)
router.get('/courses', getAllCourses)
router .get('/:courseId', courseDetails)
router.post('/buy/:courseId',authMiddleware ,buyCourse)
router.get('/getcourse', getPurchasedCourses)


export default router;