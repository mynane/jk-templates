import chalk from "chalk";
import { JKUtil } from "../libs/Application";
import { checkUrl } from "../utils";

class Module extends JKUtil {
  /**
   * create
   */
  public async create(name?: string) {
    try {
      const moduleName = name ?? (await this.ctx?.Form?.input({ message: "please input module`s name:" }));
      const url = await this.ctx?.Form?.input({ message: "please input module`s url:", check: checkUrl });
      const describe = await this.ctx?.Form?.input({ message: "please input module`s describe:" });
      await this.ctx?.Api?.saveGroup({ name: moduleName, describe, url });
      console.log(chalk.green(`create module ${moduleName} success`));
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * lists
   */
  public async lists() {
    try {
      const { data } = await this.ctx?.Api?.groupLists();
      if (!data.length) {
        try {
          console.log(chalk.green("No data found"));
          await this.ctx?.Form?.confirm("do you need to create a new one");
          this.create();
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
