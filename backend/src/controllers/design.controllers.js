import { ApiResponse } from "../utils/ApiResponse.js";
import { Design } from "../model/design.model.js";
import { User } from "../model/user.model.js";
const createDesign = async (req, res) => {
    try {
        const { title, images, product, isPublic } = req.body;
        const design = await Design.create({
            title,
            images,
            product,
            isPublic,
            createdBy: req.user._id,
        });
        return res
            .status(201)
            .json(new ApiResponse(201, "Design created successfully", design));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, error.message));
    }
};
const getAllDesigns = async (req, res) => {
    const designs = await Design.find({ isPublic: true })
        .populate("createdBy", "name")
        .sort({ likesCount: -1 });

    res.json(new ApiResponse(200, "Designs fetched successfully", designs));
};
const toggleLikeDesign = async (req, res) => {
    const design = await Design.findById(req.params.id);

    const userId = req.user._id.toString();

    const alreadyLiked = design.likedBy.includes(userId);

    if (alreadyLiked) {
        design.likedBy.pull(userId);
        design.likesCount--;
    } else {
        design.likedBy.push(userId);
        design.likesCount++;

        // ⭐ ADD POINT TO CREATOR
        await User.findByIdAndUpdate(design.createdBy, {
            $inc: { points: 1 },
        });
    }

    await design.save();

    res.json(new ApiResponse(200, "Design like status toggled", {
        likesCount: design.likesCount,
        likedBy: design.likedBy,
    }));
};

export { createDesign, getAllDesigns, toggleLikeDesign };