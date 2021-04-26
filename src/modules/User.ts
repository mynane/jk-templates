import chalk from "chalk";
import { Command, Global } from "../libs/Application";
import Login from "../common/Login";
import Api from "../common/Api";
import { IContext } from "../types/base.type";

/**
 * 个人认证
 */
// @Inject(Api)
@Command({
  command: "whoami",
  description: "who am i?",
  alias: "w",
  // providers: [Api],
})
class User {
  ctx: IContext | undefined;

  public action = async () => {
    try {
      const user = await this.ctx?.Api?.user();
      if (!user) {
        throw new Error("user can not found");
      }
      console.log(chalk.green(`current login user is: ${chalk.blue(user.login)}`));
    } catch (error) {
      console.log(chalk.red("user can not found!"));
      console.log(12312);
      this.ctx?.Login?.confirm();
    }
  };
}

export default User;
