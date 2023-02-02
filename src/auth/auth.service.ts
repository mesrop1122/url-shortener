import { Iauth, Idata } from "./dto/auth.dto";
import { client } from "../config/config";
import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

class AuthService {
  private createTokens(data: Idata) {
    // @ts-ignore
    const accessToken = sign({ id: data.id }, process.env.SECRET, {
      expiresIn: 3600 * 15,
    });
    // @ts-ignore
    const refreshToken = sign({ ...data }, process.env.SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }
  async createUser(body: Iauth) {
    try {
      const password = await hash(body.password, 10);
      const user = await client.user.create({
        data: { ...body, password },
      });
      return { status: 200, payload: { ...user } };
    } catch (error) {
      return { status: 403, payload: { msg: "email not found." } };
    }
  }
  async loginUser(email: string, password: string) {
    try {
      const user = await client.user.findUniqueOrThrow({
        where: { email },
        select: { email: true, password: true, id: true },
      });
      const validation = await compare(password, user.password);

      if (validation) {
        const data = this.createTokens({ email: user.email, id: user.id });
        return { status: 200, payload: { ...data } };
      }
      return { status: 401, payload: { msg: "password not correct." } };
    } catch (error) {
      return { status: 401, payload: { msg: "email not correct." } };
    }
  }
  verifyToken(token: string) {
    try {
      // @ts-ignore
      const data = verify(token, process.env.SECRET);
      return { status: 200, payload: data };
    } catch (error) {
      return { status: 404, payload: { msg: "token not found." } };
    }
  }
  regenerate(id: string) {
    // @ts-ignore
    const token = sign({ id }, process.env.SECRET);
    return { status: 200, payload: { token } };
  }
}

const authService = new AuthService();
export default authService;
