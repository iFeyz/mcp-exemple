import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

// GET all users
router.get("/", (req: Request, res: Response) => {
  return UserController.getAll(req, res);
});

// GET user by id
router.get("/:id", (req: Request, res: Response) => {
  return UserController.getById(req, res);
});

// POST create new user
router.post("/", (req: Request, res: Response) => {
  return UserController.create(req, res);
});

// PUT update user
router.put("/:id", (req: Request, res: Response) => {
  return UserController.update(req, res);
});

// DELETE user
router.delete("/:id", (req: Request, res: Response) => {
  return UserController.delete(req, res);
});

export default router; 