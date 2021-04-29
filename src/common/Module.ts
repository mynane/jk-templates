import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import moment from "moment";
import { JKUtil } from "../libs/Application";
import { checkGitUrl, checkNpmUrl } from "../utils";
import { exec } from "child_process";

const types: { [key: string]: string } = {
  git: "git repositories",
  npm: "npm package",
};

const moduleConfig: any = {
  "git repositories": {
    name: "git",
    check: checkGitUrl,
    placehoder: "please input module`s url(.git):",
  },
  "npm package": {
    name: "npm",
    check: checkNpmUrl,
    placehoder: "please input module`s name:",
  },
};

class Module extends JKUtil {
  /**
   * create
   */
  public async create(name?: string) {
    try {
      const moduleName = name ?? (await this.ctx?.Form?.input({ message: "please input module`s name:" }));
      const type: any = await this.ctx?.Form?.list({
        choices: Object.keys(moduleConfig),
        message: "please input module`s type:",
      });
      const config = moduleConfig[type];
      const url = await this.ctx?.Form?.input({
        message: config.placehoder,
        check: config.check,
      });
      const describe = await this.ctx?.Form?.edit({ message: "please input module`s describe:" });
      const result = await this.ctx?.Api?.saveGroup({ name: moduleName, describe, url, type: config.name });
      console.log(chalk.green(`create module ${moduleName} success ModuleID: ${result?._id}`));
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * edit
   */
  public async edit(id: string) {
    try {
      const module = await this.ctx?.Api?.getOneById(id);
      if (!module) {
        throw new Error("module not found");
      }

      const config = moduleConfig[types[module.type]];

      const moduleName = await this.ctx?.Form?.input({
        message: "please input module`s name:",
        defaultValue: module.name,
      });
      const url = await this.ctx?.Form?.input({
        message: config.placehoder,
        check: config.check,
        defaultValue: module.url,
      });
      const describe = await this.ctx?.Form?.edit({
        message: "please input module`s describe:",
        defaultValue: module.describe,
      });
      await this.ctx?.Api?.updateGroup(id, { name: moduleName, describe, url });
      console.log(chalk.green(`update module ${module.name} success ModuleID: ${id}`));
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * remove
   */
  public async remove(id = "") {
    try {
      await this.ctx?.Api?.remove(id);
      console.log(chalk.green("remove module success"));
    } catch (error) {
      console.log(chalk.red("remove module fail, please check your ModuleID"));
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
          await this.ctx?.Form?.confirm("do you need to create");
          this.create();
        } catch (error) {}

        return;
      }
      for (const i of data) {
        this.echo(i);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * echo
   */
  public echo(data: any, showDetail = true) {
    console.log(`ModuleID: ${chalk.yellow(data?._id)} ${chalk.green(`(${moment(data.create_at).fromNow()})`)}`);
    console.log(`Name: ${data?.name}`);
    console.log(`${data.type}: ${data.type === "git" ? chalk.blue(data?.url) : data?.url}`);
    console.log();
    showDetail && console.log(`    ${chalk.green(data?.describe)}`);
    showDetail && console.log();
  }

  /**
   * DownLoad
   */
  public DownLoad(url: string, moduleName = "") {
    return new Promise((resolve, reject) => {
      exec(`git clone ${url} ${moduleName}`, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        }
        if (stdout) {
          resolve(stdout);
        }
        if (stderr) {
          resolve(stderr);
        }
      });
    });
  }

  /**
   * install
   */
  public install(moduleName: string) {
    return new Promise((resolve, reject) => {
      const exists = fs.existsSync(path.join(process.cwd(), `/${moduleName}/package.json`));
      if (exists) {
        exec(`cd ./${moduleName} && npm i`, (err, stdout, stderr) => {
          if (err) {
            reject(err);
          }
          if (stdout) {
            resolve(stdout);
          }
          if (stderr) {
            resolve(stderr);
          }
        });
      } else {
        resolve("");
      }
    });
  }

  /**
   * installPackge
   */
  public installPackge(name: string, place: string, tool = "npm") {
    const params: any = { Global: "-g", local: "", "local-dev": "-D", npm: "npm i", yarn: "yarn add" };
    return new Promise((resolve, reject) => {
      exec(`${params[tool]} ${name} ${params[place]}`, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        }
        if (stdout) {
          resolve(stdout);
        }
        if (stderr) {
          resolve(stderr);
        }
      });
    });
  }
}

export default Module;
