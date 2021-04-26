/* eslint-disable prefer-const */
import { Command, JKModule } from "../libs/Application";
import { IContext } from "../types/base.type";

@Command({
  command: "lists",
  description: "modules lists",
  alias: "l",
})
export class Lists extends JKModule {
  /**
   * action
   */
  public action = async () => {
    await this.ctx?.Module?.lists();
  };
}

/**
 * 个人认证
 */
@Command({
  command: "group",
  description: "manage your modules",
  alias: "g",
  options: [
    ["-n, --name <name>", "create module by name"],
    ["-l, --lists", "show modlues lists"],
  ],
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
