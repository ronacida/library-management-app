// UserController.ts
import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IUserService } from '../interfaces/IUserService';
import { UserDTO } from '../dtos/UserDTO';
import { BorrowRecord } from '../entities/BorrowRecord';

@injectable()
export class UserController {
    constructor(@inject('IUserService') private readonly userService: IUserService) { }

    async getUsers(req: Request, res: Response): Promise<Response<UserDTO[]>> {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getUserDetails(req: Request, res: Response): Promise<Response<{ user: UserDTO; books: { past: BorrowRecord[]; present: BorrowRecord[] } }>> {
        try {
            const userId = parseInt(req.params.id);
            const userDetails = await this.userService.getUserDetails(userId);
            return res.status(200).json(userDetails);
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }

    async createUser(req: Request, res: Response): Promise<Response<UserDTO>> {
        try {
            const userData: UserDTO = req.body;
            const newUser = await this.userService.createUser(userData);
            return res.status(201).json(newUser);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response<void>> {
        try {
            const userId = parseInt(req.params.id);
            const userData: Partial<UserDTO> = req.body;
            const updatedUser = await this.userService.updateUser(userId, userData);
            return res.status(200).json(updatedUser);
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }
}
