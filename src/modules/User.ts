import chalk from "chalk";
import Api from "../common/API";
import { Command } from "../utils/Bootstrap";
import Login from "../common/Login";

/**
 * 个人认证
 */
// @Inject(Api)
@Command({
  command: "whoami",
  description: "who am i?",
  alias: "w",
  providers: [Api, Login],
})
class User {
  private readonly Api?: Api;
  private readonly Login?: Login;

  public action = async () => {
    try {
      const user = await this.Api?.user();
      if (!user) {
        throw new Error("user can not found");
      }
      console.log(chalk.green(`current login user is: ${chalk.blue(user.login)}`));
    } catch (error) {
      console.log(chalk.red("user can not found!"));
      this.Login?.confirm();
    }
  };
}

export default User;
