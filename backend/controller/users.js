import UserModel from "../models/userModel.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id)
        res.status(200).json(user);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}