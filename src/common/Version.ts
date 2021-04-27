import chalk from "chalk";
import latestVersion from "latest-version";
import { exec } from "child_process";
import { JKUtil } from "../libs/Application";

const pack = require("../../package");

class Version extends JKUtil {
  /**
   * update
   */
  public update(version: string) {
    return new Promise((resolve, reject) => {
      exec(`npm i -g ${pack.name}@${version}`, (err, stdout, stderr) => {
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
   * check
   */
  public async check() {
    const lastVersion = await latestVersion(pack.name);
    if (lastVersion && lastVersion !== pack.version) {
      console.log(chalk.green(`${pack.name} latest version is ${lastVersion}, current version is ${pack.version}`));
      try {
        await this.ctx?.Form?.confirm(`do you want to install version ${lastVersion}`);
        this.ctx?.Loading?.start("updating \n");
        await this.update(lastVersion);
        this.ctx?.Loading?.spinner?.succeed("success");
      } catch (error) {
        this.ctx?.Loading?.spinner?.fail("updating fail!");
        console.log(chalk.red(error));
      }
    }
  }
}

export default Version;
