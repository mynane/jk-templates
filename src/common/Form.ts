import chalk from "chalk";
import inquirer from "inquirer";
import inquirerConfirm from "inquirer-confirm";
import { JKUtil } from "../libs/Application";

export interface IInput {
  defaultValue?: string;
  message?: string;
  required?: boolean;
  check?: (val: string) => Promise<any>;
}

class Form extends JKUtil {
  public confirm(title = "yes|no") {
    return new Promise((resolve, reject) => {
      inquirerConfirm(title).then(
        function confirmed() {
          resolve(true);
        },
        function cancelled() {
          reject(false);
        }
      );
    });
  }
  /**
   * input
   */
  public input(props: IInput = {}) {
    const { defaultValue, message = "please input:", required = true, check } = props;
    return new Promise((resolve, reject) => {
      inquirer
        .prompt([
          {
            message,
            default: defaultValue,
            name: "input",
            type: "input",
          },
        ])
        .then(async (res: any) => {
          const name = res.input.toString();
          if (!name && !defaultValue && required) {
            try {
              const result = await this.input(props);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          }
          if (name && check) {
            try {
              await check(name);
            } catch (_error) {
              console.log(chalk.green(_error));
              try {
                const result = await this.input(props);
                resolve(result);
              } catch (error) {
                reject(error);
              }
            }
          }

          resolve(name);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

export default Form;
