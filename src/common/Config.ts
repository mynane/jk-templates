import fs from "fs-extra";
import Constant from "../config/constant";
import { JKUtil } from "../libs/Application";

class Config extends JKUtil {
  public _config = "{}";
  constructor() {
    super();
    this.load();
  }

  get config() {
    return JSON.parse(this._config || "{}");
  }

  public load() {
    try {
      this._config = fs.readFileSync(Constant?.JK_CONFIG).toString();
    } catch (error) {
      fs.ensureDirSync(Constant?.JK_ROOT);
      fs.writeFileSync(Constant?.JK_CONFIG, "");
    }
  }

  /**
   * save
   */
  public save(key: string, value: any) {
    return new Promise((resolve) => {
      const doc = JSON.stringify({ ...this.config, [key]: value });
      fs.writeFileSync(Constant?.JK_CONFIG, doc);
      this._config = doc;
      resolve(true);
    });
  }

  /**
   * get
   */
  public get(key: string) {
    return this.config[key];
  }

  /**
   * clear
   */
  public async clear() {
    fs.writeFileSync(Constant?.JK_CONFIG, "{}");
    this._config = "{}";
  }
}

export default Config;
