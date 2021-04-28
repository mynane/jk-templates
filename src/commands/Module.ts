/* eslint-disable prefer-const */
import chalk from "chalk";
import { Command, JKModule } from "../libs/Application";

@Command({
  command: "lists",
  description: "modules lists",
  alias: "ls",
})
export class Lists extends JKModule {
  /**
   * action
   */
  public action = async () => {
    await this.ctx?.Module?.lists();
  };
}

@Command({
  command: "edit <ModuleID>",
  description: "edit module by ModuleID",
  alias: "e",
})
export class Edit extends JKModule {
  /**
   * action
   */
  public action = async (moduleID: string) => {
    await this.ctx?.Module?.edit(moduleID);
  };
}

@Command({
  command: "remove <ModuleID>",
  description: "remove module by ModuleID",
  alias: "rm",
})
export class Remove extends JKModule {
  /**
   * action
   */
  public action = async (moduleID: string) => {
    if (!moduleID) {
      return console.log(chalk.red("plase input you ModuleID"));
    }

    try {
      await this.ctx?.Form?.confirm(`confirm to delete module`);
      await this.ctx?.Module?.remove(moduleID);
    } catch (error) {}
  };
}

/**
 * 个人认证
 */
@Command({
  command: "module",
  description: "manage your modules",
  alias: "m",
  options: [["-n, --name <name>", "create module by name"]],
})
export class Module extends JKModule {
  public action = async (type: any) => {
    const { name, lists } = type;
    if (name || !Object.keys(type).length) {
      this.ctx?.Module?.create(name);
    } else if (lists) {
      this.ctx?.Module?.lists();
    }
  };

  /**
   * createModule
   */
  public async createModule(name?: string) {
    await this.ctx?.Module?.create(name);
  }

  /**
   * showLists
   */
  public async showLists() {
    await this.ctx?.Module?.lists();
  }
}
