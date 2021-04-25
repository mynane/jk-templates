import chalk from "chalk";
import { program } from "commander";

export interface IOptions {
  modules?: any[];
  providers?: any[];
  [key: string]: any;
}

export interface ICommand {
  command: string;
  description?: string;
  alias?: string;
  options?: string[][];
  action?: () => void;
  providers?: any[];
  [key: string]: any;
}

/**
 * 注册命令行
 * @param instance
 */
export function rejesterProgram(instance: Exclude<ICommand, "providers">, name: string) {
  const { command, action, options, description, alias } = instance;
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
    com?.action(action);
  }

  return instance;
}

/**
 * 启动项
 * @param options
 * @returns
 */
export function Bootstrap<T extends IOptions, U>(options: T) {
  return function (target: { new (): U }) {
    const { modules = [], providers = [] } = options;

    target.prototype.modules = modules.map((m) => {
      for (const p of [...m.$providers, ...providers]) {
        m.prototype[p.name] = new p();
      }
      return rejesterProgram(new m(), m.name);
    });
  };
}

/**
 * 命令行装饰器
 * @param options
 * @returns
 */
export function Command<T extends ICommand, U>(options: T) {
  return function (target: { new (): U; [key: string]: any }) {
    const { providers = [], ...configs } = options;
    target.$providers = providers;
    for (const i of Object.keys(configs)) {
      target.prototype[i] = options[i];
    }
  };
}
