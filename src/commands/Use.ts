/* eslint-disable prefer-const */
import chalk from "chalk";
import { Command, JKModule } from "../libs/Application";

/**
 * 个人认证
 */
@Command({
  command: "use <ModuleID>",
  description: "use one template module init your project",
})
class Use extends JKModule {
  public action = async (moduleID: any) => {
    if (!moduleID) {
      return console.log(chalk.red("plase input you ModuleID"));
    }
    try {
      const result = await this.ctx?.Api?.group(moduleID);
      this.ctx?.Module?.echo(result, false);
      if (result.type === "git") {
        const moduleName: any = await this.ctx?.Form?.input({ message: "input module name:" });
        this.ctx?.Loading?.start("module loading \n");
        await this.ctx?.Module?.DownLoad(result?.url, moduleName);
        this.ctx?.Loading?.text("installing \n");
        await this.ctx?.Module?.install(moduleName);
        this.ctx?.Loading?.spinner?.succeed("success");
      } else {
        const place: any = await this.ctx?.Form?.list({
          choices: ["Gloabl", "local", "local-dev"],
          message: "Please select the installation location",
        });
        const tool: any = await this.ctx?.Form?.list({
          choices: ["npm", "yarn"],
          defaultValue: "npm",
          message: "Please select the installation tool",
        });
        this.ctx?.Loading?.start("npm package installing \n");
        await this.ctx?.Module?.installPackge(result?.url, place, tool);
        this.ctx?.Loading?.spinner?.succeed("success");
      }
    } catch (error) {
      this.ctx?.Loading?.spinner?.fail("failed!");
      console.log(chalk.red(error));
    }
  };
}

export default Use;
