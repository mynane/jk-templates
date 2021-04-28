import axios, { AxiosResponse } from "axios";
import chalk from "chalk";
import Constant from "../config/constant";
import { JKUtil } from "../libs/Application";

class Api extends JKUtil {
  get token() {
    this.ctx?.Token?.load();
    return this.ctx?.Token?.token || "";
  }

  public async handle(res: AxiosResponse<any>, url: string, headers = {}, method: string, postData = {}) {
    const { code, data, message = "" } = res?.data ?? {};
    if (code === 0) {
      return data;
    } else if (code === 401) {
      await this.ctx?.Auth?.confirm();
      return await (this as any)[method](url, headers, postData);
    } else {
      throw new Error(chalk.red(message));
    }
  }

  /**
   * get method
   * @param url
   * @param headers
   * @returns
   */
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
   * delete method
   * @param url
   * @param headers
   * @returns
   */
  public delete(url: string, headers = {}): any {
    return axios({
      url: `${Constant?.PREFIX}${url}`,
      method: "delete",
      headers: { ...headers, "Content-Type": "application/json", Authorization: `Bearer ${this.token}` },
    }).then(async (res: AxiosResponse<any>) => {
      return this.handle(res, url, headers, "delete");
    });
  }

  /**
   * post method
   * @param url
   * @param headers
   * @param data
   * @returns
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
   * put method
   * @param url
   * @param headers
   * @param data
   * @returns
   */
  public put(url: string, headers = {}, data = {}) {
    return axios({
      method: "put",
      data,
      url: `${Constant?.PREFIX}${url}`,
      headers: { ...headers, "Content-Type": "application/json", Authorization: `Bearer ${this.token}` },
    }).then(async (res: AxiosResponse<any>) => {
      return this.handle(res, url, headers, "put", data);
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
    return await this.post("/group", {}, values);
  }

  /**
   * saveGroup
   */
  public async updateGroup(id: string, values: any) {
    return await this.put(`/group/${id}`, {}, values);
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

  /**
   * remove
   */
  public async remove(id: string) {
    return await this.delete(`/group/${id}`);
  }

  /**
   * remove
   */
  public async getOneById(id: string) {
    return await this.get(`/group/${id}`);
  }
}

export default Api;
