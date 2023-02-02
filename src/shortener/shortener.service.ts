import { client } from "../config/config";
import { Ishortener } from "./dto/shortener.dto";

class ShortService {
  private convertUrl(data: { id: string }[]) {
    return data.map(item => `${process.env.HOST}/${item.id}`);
  }
  async add(body: Ishortener) {
    const short = await client.url.create({
      data: { ...body },
    });
    return { status: 200, payload: { url: `${process.env.HOST}/${short.id}` } };
  }
  async getMyUrls(id: string, page: number) {
    try {
      const urlCount = await client.url.count({ where: { id } });
      const myUrls = await client.url.findMany({
        where: { id },
        take: page * 10,
        skip: (page - 1) * 10,
        select: { id: true },
      });

      return {
        status: 200,
        payload: { pages: urlCount / 10, myUrls: this.convertUrl(myUrls) },
      };
    } catch (error) {
      return { status: 404, payload: { msg: "urls not found." } };
    }
  }
  async getOne(id: string) {
    try {
      const url = await client.url.findUniqueOrThrow({ where: { id } });
      return { status: 200, payload: { ...url } };
    } catch (error) {
      return { status: 404, payload: { msg: "url not found." } };
    }
  }
}

const shortService = new ShortService();
export default shortService;
