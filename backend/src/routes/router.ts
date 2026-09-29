import { Router } from "express";
import { health } from "../controller/health.controller.js";
import {
  create,
  getById,
  list,
  remove,
  update,
} from "../controller/task.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router: Router = Router();

router.get("/health", health);

router.get("/tasks", requireAuth, list);
router.get("/tasks/:id", requireAuth, getById);
router.post("/tasks", requireAuth, create);
router.patch("/tasks/:id", requireAuth, update);
router.delete("/tasks/:id", requireAuth, remove);

export default router;
