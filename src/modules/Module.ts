/* eslint-disable prefer-const */
import chalk from "chalk";
import Inject from "../utils/Inject";
import Api from "../common/API";
import Form from "../common/Form";
import { checkUrl } from "../utils";
import { Command } from "../utils/Bootstrap";

/**
 * 个人认证
 */
@Inject(Api)
@Inject(Form)
@Command({
  command: "group",
  description: "manage your groups",
  alias: "g",
  options: [
    ["-n, --name <name>", "create module by name"],
    ["-l, --lists", "show modlues lists"],
  ],
})
class Module {
  public Api: Api | undefined;
  public Form: Form | undefined;

  public action = async (type: any) => {
    const { name, lists } = type;
    if (name || !Object.keys(type).length) {
      this.createModule(name);
    } else if (lists) {
      this.showLists();
    }
  };

  /**
   * createModule
   */
  public async createModule(name?: string) {
    try {
      const moduleName = name ?? (await this.Form?.input({ message: "please input module`s name:" }));
      const url = await this.Form?.input({ message: "please input module`s url:", check: checkUrl });
      const describe = await this.Form?.input({ message: "please input module`s describe:" });
      await this.Api?.saveGroup({ name: moduleName, describe, url });
      console.log(chalk.green(`create module ${moduleName} success`));
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * showLists
   */
  public async showLists() {
    try {
      const { data } = await this.Api?.groupLists();
      if (!data.length) {
        try {
          console.log(chalk.green("No data found"));
          await this.Form?.confirm("do you need to create a new one");
          this.createModule();
        } catch (error) {}

        return;
      }
      for (const i of data) {
        console.log(`ModuleID: ${chalk.green(i?._id)}`);
        console.log(`Name: ${i?.name}`);
        console.log(`URL: ${i?.url}`);
        console.log(`Date: ${i?.create_at}`);
        console.log();
        console.log(`    ${i?.describe}`);
        console.log();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Module;
