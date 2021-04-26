import fs from "fs-extra";
import Constant from "../config/constant";

class Token {
  public token: string | undefined;
  constructor() {
    this.load();
  }

  public load() {
    try {
      this.token = fs.readFileSync(Constant?.JK_TOKEN).toString();
    } catch (error) {
      fs.ensureDirSync(Constant?.JK_ROOT);
      fs.writeFileSync(Constant?.JK_TOKEN, "");
    }
  }

  /**
   * save
   */
  public save(doc = "") {
    console.log(doc);
    return new Promise((resolve) => {
      fs.writeFileSync(Constant?.JK_TOKEN, doc);
      this.token = doc;
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

export default Token;
