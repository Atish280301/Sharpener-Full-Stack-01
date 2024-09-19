// backend/routes/user.js;
import express from 'express';
import { createUser, getUser, deleteUser, patchUser, searchUser } from '../controller/user.js';
const router = express.Router();
router
    .post("/", createUser)
    .get("/", searchUser)
    .get("/", getUser)
    .delete("/:id", deleteUser)
    .patch("/:id", patchUser)

export const userRouter = router;