"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
// GET all users
router.get("/", (req, res) => {
    return UserController_1.UserController.getAll(req, res);
});
// GET user by id
router.get("/:id", (req, res) => {
    return UserController_1.UserController.getById(req, res);
});
// POST create new user
router.post("/", (req, res) => {
    return UserController_1.UserController.create(req, res);
});
// PUT update user
router.put("/:id", (req, res) => {
    return UserController_1.UserController.update(req, res);
});
// DELETE user
router.delete("/:id", (req, res) => {
    return UserController_1.UserController.delete(req, res);
});
exports.default = router;
