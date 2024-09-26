/**
 * Controller for handling user-related operations, including CRUD actions.
 * Utilizes `UserService` to interact with user data and ensures results are parsed.
 */

import { UserService } from "@/services/user";
import { IndexController } from ".";
import { TUser } from "@/types/shared-types";

export class UserController extends IndexController {
  constructor() {
    super();
  }
  async getUser(payload: any) {
    const service = new UserService();
    const res = await service.getUserList(payload);
    return this.parse(res);
  }
  async addUser(payload: TUser) {
    const service = new UserService();
    const res = await service.addUser(payload);
    return this.parse(res);
  }
  async deleteUser(id: string) {
    const service = new UserService();
    const res = await service.deleteUser(id);
    return this.parse(res);
  }
  async updateUser(payload: any) {
    const service = new UserService();
    const res = await service.updateUser(payload);
    return this.parse(res);
  }
  async getUserById(id: string) {
    const service = new UserService();
    const res = await service.getUserById(id);
    return this.parse(res);
  }
}
