import chalk from "chalk";
import { program } from "commander";
import fs from "fs-extra";
import path from "path";

/**
 * 注册命令行
 * @param instance
 */
export function rejesterProgram(instance: any, name: string) {
  const { command, action, options, description, alias, ctx } = instance;
  if (!command || !action) {
    throw new Error(`module '${name}' not found ${chalk.blue("command")}  property or ${chalk.blue("action")} method`);
  }

  const com = program.command(command);
  if (alias) {
    com?.alias(alias);
  }
  if (description) {
    com?.description(description);
  }
  if (options) {
    for (const option of options) {
      com?.option(option[0], option[1]);
    }
  }
  if (action) {
    com?.action(async (a: any, b: any) => {
      await action(a, b);
      // check version when action called
      await ctx?.Version?.check();
    });
  }

  return instance;
}

class Exector {
  commands: any;
  $providers: any;
  globalProviders: any;
  prototype: any;
  mudules: any;

  public loadModules() {
    const _path = path.resolve(__dirname, "../commands");
    const files = fs.readdirSync(_path);
    for (const f of files) {
      if (!f.endsWith(".d.ts")) {
        require(`${_path}/${f}`);
      }
    }
  }

  public initCommands() {
    for (const c of this.commands) {
      (c[1] as any).prototype["ctx"] = this.mudules;
      const instance = new c[1]();
      rejesterProgram(instance, c[0]);
    }
  }

  public initGlobal() {
    for (const c of this.$providers) {
      (c as any).prototype["ctx"] = this.mudules;
      const instance = new c();
      instance.ctx = this.mudules;
      this.globalProviders.set(c.name, instance);
      this.mudules[c.name] = instance;
    }
  }
}

export default Exector;
