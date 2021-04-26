import axios, { AxiosResponse } from "axios";
import chalk from "chalk";
import Constant from "../config/constant";
import { Inject } from "../libs/Application";
import Auth from "./Auth";
import Token from "./Token";

@Inject([Token, Auth])
class Api {
  [x: string]: any;
  get token() {
    this.Token()?.load();
    return this.Token()?.token || "";
  }

  public async handle(res: AxiosResponse<any>, url: string, headers = {}, method: string, postData = {}) {
    const { code, data, message = "" } = res?.data ?? {};
    if (code === 0) {
      return data;
    } else if (code === 401) {
      await this.Auth()?.confirm();
      return await (this as any)[method](url, headers, postData);
    } else {
      throw new Error(chalk.red(message));
    }
  }

  public get(url: string, headers = {}): any {
    return axios({
      url: `${Constant?.PREFIX}${url}`,
      method: "get",
      headers: { ...headers, "Content-Type": "application/json", Authorization: `Bearer ${this.token}` },
    }).then(async (res: AxiosResponse<any>) => {
      return this.handle(res, url, headers, "get");
    });
  }

  /**
   * post
   */
  public post(url: string, headers = {}, data = {}) {
    return axios({
      method: "post",
      data,
      url: `${Constant?.PREFIX}${url}`,
      headers: { ...headers, "Content-Type": "application/json", Authorization: `Bearer ${this.token}` },
    }).then(async (res: AxiosResponse<any>) => {
      return this.handle(res, url, headers, "post", data);
    });
  }

  /**
   * user
   */
  public async user() {
    return await this.get("/user");
  }

  /**
   * saveGroup
   */
  public async saveGroup(values: any) {
    return await this.post("/group", values);
  }

  /**
   * saveGroup
   */
  public async groupLists() {
    return await this.get("/groups?pageSize=100");
  }

  /**
   * saveGroup
   */
  public async group(id: string) {
    return await this.get(`/group/${id}`);
  }

  /**
   * ids
   */
  public async ids() {
    return await this.get("/recommends?pageSize=1000");
  }
}

export default Api;
