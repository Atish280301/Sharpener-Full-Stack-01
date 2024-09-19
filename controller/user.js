// backend/controller/user.js

import { Users } from "../models/index.js";

export const createUser = async (req, res) => {
    try {
        const data = new Users(req.body);
        const saveUser = await data.save();
        res.status(201).json(saveUser);
    } catch (error) {
       console.error("Error Creating User : ",error);
       res.status(500).json({error: "Failed To Create Product"}); 
    }
}

export const getUser = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        console.log("Error Fetching Products : ",error);
        res.status(500).json({error: "Failed To Fetch Users"});
    }
}

export const searchUser = async (req, res) => {
    try {
        const {search} = req.query;

        let query = {};
        if(search) {
            query = {
                $or:[
                    { username: { $regex: search, $options: 'i' } },
                ]
            }
        }
        const users = await Users.find(query);
        res.json(users);
    } catch (error) {
        console.log("Error Fetching Users: ", error);
        res.status(500).json({ error: "Failed To Fetch Users" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleteProduct = await Users.findOneAndDelete({_id: userId});
        if(!deleteProduct) {
            return res.status(404).json({error: "User Not Found"});
        } else {
            return res.status(200).json({message: "User Deleted Successfully!"});
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed To Delete User" });
    }
}

export const patchUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateUser = await Users.findOneAndUpdate(
            {_id: userId},
            {$set: req.body},
            {new: true}
        );
        if(!updateUser) {
            return res.status(404).json({error: "User Not Found"});
        } else {
            return res.status(200).json(updateUser);
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
}