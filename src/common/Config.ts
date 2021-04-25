import chalk from "chalk";
import fs from "fs-extra";
import Constant from "../config/constant";
import Inject from "../utils/Inject";

class Config {
  public _config = "{}";
  constructor() {
    this.load();
  }

  get config() {
    return JSON.parse(this._config);
  }

  public load() {
    try {
      this._config = fs.readFileSync(Constant?.JK_USER).toString();
    } catch (error) {
      fs.ensureDirSync(Constant?.JK_ROOT);
      fs.writeFileSync(Constant?.JK_USER, "");
    }
  }

  /**
   * save
   */
  public save(doc = "{}") {
    return new Promise((resolve) => {
      fs.writeFileSync(Constant?.JK_USER, doc);
      this._config = doc;
      resolve(true);
    });
  }

  /**
   * clear
   */
  public async clear() {
    await this.save();
  }
}

export default Config;
