import cloudinary from "../config/cloudinary.js";
import Course from "../models/courseModel.js";
import Purchase from "../models/purchaseModels.js";

export const createCourse = async (req, res) => {
    const adminId = req.adminId;
    try {
        const { title, description, price } = req.body;
        if (!title || !description || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const {image} = req.files;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "No files were uploaded." });
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(image.mimetype)) {
            return res.status(400).json({ message: "Invalid file type" });
        }
        if (image.size > 1024 * 1024) {
            return res.status(400).json({ message: "File size exceeds 1MB" });
        }

        //cloudinary upload
        const cloudinary_response = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: "courses",
        });
        if (!cloudinary_response) {
            return res.status(500).json({ message: "Cloudinary upload failed" });
        }

        createrId = adminId;
        const course = await Course.create({
            title,
            description,
            price,
            image : {
                public_id: cloudinary_response.public_id,
                url: cloudinary_response.url,
            },
        });
        return res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message, message: "Create error"});
    }
}

export const updateCourse = async (req, res) => {
    const adminId = req.adminId;
    const { courseId } = req.params;
    const { title, description, price } = req.body;
    try {
        const courseSearch = await Course.findById(courseId);
        if (!courseSearch) {
            return res.status(404).json({ message: "Course not found" });
        }
        const course = await Course.updateOne(
            { _id: courseId,
                createrId: adminId
             },
            {
                title,
                description,
                price,
                image: {
                    public_id: req.body.public_id,
                    url: req.body.url,
                },
            },
            { new: true }
        )
        res.status(200).json({ message: "Course updated successfully", course })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: "Update error" })
    }
}

export const deleteCourse = async (req, res) => {
    const adminId = req.adminId;
    try {
        const courseId = req.params;
        const course = await Course.findByIdAndDelete({
            _id : courseId,
            createrId: adminId
        });
        if(!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        // delete from cloudinary
        const imageId = course.image.public_id;
        const imageUrl = course.image.url;
        const imagePublicId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imagePublicId, { resource_type: "image" });
        res.status(200).json({ message: "Course deleted successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: "Delete error" })
    }
}

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses) {
            return res.status(404).json({ message: "No courses found" });
        }
        res.status(200).json({ message: "Courses fetched successfully", courses });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: "Fetch error" });
    }
}

export const courseDetails = async (req, res) => {
    try {
        const {courseId} = req.params;
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }
        res.status(200).json({ message: "Course details fetched successfully", courseId });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: "Fetch error" });
    }
}

export const buyCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { userId } = req.user;
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const existingCourse = await Purchase.findOne({ userId, courseId });
        if (existingCourse) {
            return res.status(400).json({ message: "Course already purchased" });
        }
        const newPurchase = await Purchase.create({ userId, courseId });
        await newPurchase.save();
        if (!newPurchase) {
            return res.status(500).json({ message: "Purchase failed" });
        }
        res.status(200).json({ message: "Course purchased successfully", newPurchase });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: "Purchase error" });
    }
}

export const getPurchasedCourses = async (req, res) => {
    try {
        const { userId } = req.user;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const purchasedCourses = await Purchase.find({ userId }).populate("courseId");
        if (!purchasedCourses) {
            return res.status(404).json({ message: "No purchased courses found" });
        }
        res.status(200).json({ message: "Purchased courses fetched successfully", purchasedCourses });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: "Fetch error" });
    }
}