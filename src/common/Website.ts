import open from "open";
import { JKUtil } from "../libs/Application";

const pack = require("../../package.json");

class Website extends JKUtil {
  /**
   * open
   */
  public open(url: string) {
    open(url);
  }

  /**
   * doc
   */
  public Home() {
    this.open(pack.homepage);
  }

  /**
   * github
   */
  public github() {
    this.open(pack.repository);
  }
}

export default Website;
