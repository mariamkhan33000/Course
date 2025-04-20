import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    }
}, { timestamps: true });

const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;