import UserService from '../services/userService';
import { Context } from 'koa';

class UserController {
  public static async getAllUsers (ctx: Context) {
    const result = await UserService.UsersListAction();
    ctx.body = '1112ssssss2111';
    
  }
  public static async testCors(ctx: Context){
    ctx.body = 'jadkssssssssf';
  }
}

export default UserController;