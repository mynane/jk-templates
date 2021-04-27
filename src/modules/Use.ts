/* eslint-disable prefer-const */
import chalk from "chalk";
import { Command, JKModule } from "../libs/Application";

/**
 * 个人认证
 */
@Command({
  command: "use <ModuleID>",
  description: "",
  alias: "",
})
class Use extends JKModule {
  public action = async (moduleID: any) => {
    if (!moduleID) {
      return console.log(chalk.red("plase input you ModuleID"));
    }
    const moduleName: any = await this.ctx?.Form?.input({ message: "input module name:" });
    try {
      const result = await this.ctx?.Api?.group(moduleID);
      console.log(`ModuleID: ${chalk.green(result?._id)}`);
      console.log(`Name: ${result?.name}`);
      console.log(`URL: ${result?.url}`);
      console.log();
      this.ctx?.Loading?.start("module loading \n");
      await this.ctx?.Module?.DownLoad(result?.url, moduleName);
      this.ctx?.Loading?.text("installing \n");
      await this.ctx?.Module?.install(moduleName);
      this.ctx?.Loading?.spinner?.succeed("success");
    } catch (error) {
      this.ctx?.Loading?.spinner?.fail("module loading or install fail!");
      console.log(chalk.red(error));
    }
  };
}

export default Use;
