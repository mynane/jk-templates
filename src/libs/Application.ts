import chalk from "chalk";
import { program } from "commander";
import Exector from "./Exector";

export interface ICommand {
  command: string;
  description?: string;
  alias?: string;
  options?: string[][];
  action?: () => void;
  providers?: any[];
  [key: string]: any;
}

export interface IApplication {
  commands: Map<string, any>;
  globalProviders: Map<string, any>;
  Command: <T extends ICommand, U>(options: T) => (target: { new (): U; [key: string]: any }) => any;
  Inject: <T, U>(module: { new (): T }) => (target: { new (): U }) => any;
  Global: <T extends string>(module: T) => any;
  providers: (provider: FuntionType | FuntionType[]) => any;
  start: () => any;
  [key: string]: any;
}

type FuntionType = { new (): any };

/**
 * 主应用
 */
class Application extends Exector {
  public commands: Map<string, any> = new Map();
  public $providers: any[] = [];
  public globalProviders: Map<string, any> = new Map();

  /**
   * 命令注册
   * @param options
   * @returns
   */
  public Command = <T extends ICommand, U>(options: T) => {
    return (target: { new (): U; [key: string]: any }) => {
      const { providers = [], ...configs } = options;

      target.$providers = providers;
      for (const i of Object.keys(configs)) {
        target.prototype[i] = options[i];
      }
      this.commands.set(target.name, target);
    };
  };

  /**
   * 方法注册
   * @param module
   * @returns
   */
  public Inject = <T, U>(module: { new (): T }) => {
    return (target: { new (): U }) => {
      const instance = new module();
      target.prototype[module.name] = instance;
    };
  };

  /**
   * 全局模块引用
   * @param module
   * @returns
   */
  public Global = <T extends string, U extends string>(module: T) => {
    return (target: { new (): any; [key: string]: any }, key: U) => {
      target[key] = this.globalProviders.get(module);
    };
  };

  /**
   * 全局模块注册
   * @param provider
   */
  public providers(provider: FuntionType | FuntionType[]) {
    if (Array.isArray(provider)) {
      this.$providers = [...this.$providers, ...provider];
    } else {
      this.$providers = [...this.$providers, provider];
    }

    return this;
  }

  public start() {
    this.initGlobal();
    this.loadModules();
    this.initCommands();
  }
}

const app = new Application() as IApplication;

export const Command = app.Command;

export const Inject = app.Inject;

export const Global = app.Global;

export default app;
