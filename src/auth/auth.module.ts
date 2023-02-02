import { Router } from "express";
import authController from "./auth.controller";
import { tokenMiddleware } from "./auth.middleware";

const router = Router();
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/verify", authController.verify);
router.post("/regenerate", tokenMiddleware, authController.regenerate);

module.exports = router;
