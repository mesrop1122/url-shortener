import { Response } from "express";
import { ReqBody, ReqParams, ReqParamsQuery } from "../config/config";
import { Ishortener } from "./dto/shortener.dto";
import shortService from "./shortener.service";

class ShortController {
  async addUrl(req: ReqBody<Ishortener>, res: Response) {
    const add = await shortService.add(req.body);
    return res.status(add.status).json(add.payload);
  }
  async getUrlsByUser(
    req: ReqParamsQuery<{ id: string }, { page: number }>,
    res: Response
  ) {
    const urls = await shortService.getMyUrls(req.params.id, req.query.page);
    return res.status(urls.status).json(urls.payload);
  }
  async getOne(req: ReqParams<{ id: string }>, res: Response) {
    const url = await shortService.getOne(req.params.id);
    return res.status(url.status).json(url.payload);
  }
}

const shortController = new ShortController();
export default shortController;
