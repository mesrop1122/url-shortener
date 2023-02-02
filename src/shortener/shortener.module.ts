import { Router } from "express";
import shortController from "./shortener.controller";

const router = Router();
router.post("/", shortController.addUrl);
router.get("/user/:id", shortController.getUrlsByUser);
router.get("/:id", shortController.getOne);

module.exports = router;
