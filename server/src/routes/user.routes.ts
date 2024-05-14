import { Router } from "express";
import { UserController } from "../controller/user.controller";

const router = Router();

router.get("/users", UserController.list);
router.post("/users/register", UserController.register);

export default router;
