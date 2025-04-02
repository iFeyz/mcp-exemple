import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export class UserController {
  // Get all users
  static async getAll(req: Request, res: Response) {
    try {
      const users = await userRepository.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving users", error });
    }
  }

  // Get user by id
  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await userRepository.findOneBy({ id });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving user", error });
    }
  }

  // Create new user
  static async create(req: Request, res: Response) {
    try {
      const { firstName, lastName, age, role } = req.body;

      // Simple validation
      if (!firstName || !lastName || !age || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.age = age;
      user.role = role;

      await userRepository.save(user);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error creating user", error });
    }
  }

  // Update user
  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { firstName, lastName, age, role } = req.body;

      const user = await userRepository.findOneBy({ id });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.age = age || user.age;
      user.role = role || user.role;

      await userRepository.save(user);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error updating user", error });
    }
  }

  // Delete user
  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await userRepository.findOneBy({ id });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await userRepository.remove(user);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting user", error });
    }
  }
} 