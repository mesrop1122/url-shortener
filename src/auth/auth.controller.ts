import { Response } from "express";
import { ReqBody, ReqParams } from "../config/config";
import authService from "./auth.service";
import { Iauth, Ilogin } from "./dto/auth.dto";

class AuthController {
  async signup(req: ReqBody<Iauth>, res: Response) {
    const user = await authService.createUser(req.body);
    return res.status(user.status).json(user.payload);
  }
  async signin(req: ReqBody<Ilogin>, res: Response) {
    const { email, password } = req.body;
    const userData = await authService.loginUser(email, password);
    return res.status(userData.status).json(userData.payload);
  }
  verify(req: ReqBody<{ token: string }>, res: Response) {
    const data = authService.verifyToken(req.body.token);
    return res.status(data.status).json(data.payload);
  }
  regenerate(req: ReqParams<{ id: string }>, res: Response) {
    const newToken = authService.regenerate(req.params.id);
    return res.status(newToken.status).json(newToken.payload);
  }
}

const authController = new AuthController();
export default authController;
