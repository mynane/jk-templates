import fs from "fs-extra";
import Constant from "../config/constant";
import { JKUtil } from "../libs/Application";

class User extends JKUtil {
  public _user = "{}";
  constructor() {
    super();
    this.load();
  }

  get user() {
    return JSON.parse(this._user);
  }

  public load() {
    try {
      this._user = fs.readFileSync(Constant?.JK_USER).toString();
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
      this._user = doc;
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

export default User;
