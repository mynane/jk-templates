import { program } from "commander";
import { IBase } from "../types/base.type";

/**
 * IoC 依赖注入
 * @param value
 * @returns
 */
function Inject<T, U>(module: { new (): T }) {
  return function (target: { new (): U }) {
    const instance = new module();
    rejesterProgram(instance);
    target.prototype[module.name] = instance;
  };
}

/**
 * 注册命令行
 * @param instance
 */
function rejesterProgram(instance: IBase) {
  const { command, action, options, description, alias } = instance;
  if (!command || !action) {
    return;
  }

  const com = program.command(command);
  if (alias) {
    com?.alias(alias);
  }
  if (description) {
    com?.alias(description);
  }
  if (options) {
    for (const option of options) {
      com?.option(option[0], option[1]);
    }
  }
  if (action) {
    com?.action(action);
  }
}

export default Inject;
