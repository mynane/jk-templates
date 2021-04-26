/* eslint-disable prefer-const */
import chalk from "chalk";
import Api from "../common/Api";
import { Command, Global } from "../libs/Application";
import { IContext } from "../types/base.type";

/**
 * 个人认证
 */

@Command({
  command: "use <ModuleID>",
  description: "",
  alias: "",
})
class Use {
  ctx: IContext | undefined;

  public action = async (type: any, name: any) => {
    const [id] = name?.args;
    if (!id) {
      return console.log(chalk.red("plase input you groupid"));
    }
    const result = await this.ctx?.Api?.group(id);
    console.log("result: ", result);
    // console.log("name: ", name.args);
    // console.log(type);
  };
}

export default Use;
