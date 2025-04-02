"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entities/User");
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
class UserController {
    // Get all users
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userRepository.find();
                return res.status(200).json(users);
            }
            catch (error) {
                return res.status(500).json({ message: "Error retrieving users", error });
            }
        });
    }
    // Get user by id
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const user = yield userRepository.findOneBy({ id });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(500).json({ message: "Error retrieving user", error });
            }
        });
    }
    // Create new user
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, age, role } = req.body;
                // Simple validation
                if (!firstName || !lastName || !age || !role) {
                    return res.status(400).json({ message: "All fields are required" });
                }
                const user = new User_1.User();
                user.firstName = firstName;
                user.lastName = lastName;
                user.age = age;
                user.role = role;
                yield userRepository.save(user);
                return res.status(201).json(user);
            }
            catch (error) {
                return res.status(500).json({ message: "Error creating user", error });
            }
        });
    }
    // Update user
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { firstName, lastName, age, role } = req.body;
                const user = yield userRepository.findOneBy({ id });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                user.firstName = firstName || user.firstName;
                user.lastName = lastName || user.lastName;
                user.age = age || user.age;
                user.role = role || user.role;
                yield userRepository.save(user);
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(500).json({ message: "Error updating user", error });
            }
        });
    }
    // Delete user
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const user = yield userRepository.findOneBy({ id });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                yield userRepository.remove(user);
                return res.status(200).json({ message: "User deleted successfully" });
            }
            catch (error) {
                return res.status(500).json({ message: "Error deleting user", error });
            }
        });
    }
}
exports.UserController = UserController;
