import { Router } from "express";
import { UserController } from "../controller/user.controller";

const router = Router();

router.get("/users", UserController.list);

export default router;
