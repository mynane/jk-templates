/* eslint-disable prefer-const */
import chalk from "chalk";
import Inject from "../utils/Inject";
import Api from "../common/API";
import User from "../common/User";
import { Command } from "../utils/Bootstrap";

const loginUrl = () => {
  const CLIENT_ID = "Iv1.f92a3890970ecc1e";
  const CLIENT_SECRET = "d6ae5fbd1189ea0577b2a1b01ba0d3b902e6f3cc";
  const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
  return url;
};

/**
 * 个人认证
 */
@Inject(Api)
@Inject(User)
@Command({
  command: "use",
  description: "",
  alias: "",
})
class Use {
  public User: User | undefined;
  public Api: Api | undefined;

  public action = async (type: any, name: any) => {
    const [id] = name?.args;
    if (!id) {
      return console.log(chalk.red("plase input you groupid"));
    }
    const result = await this.Api?.group(id);
    console.log("result: ", result);
    // console.log("name: ", name.args);
    // console.log(type);
  };
}

export default Use;
