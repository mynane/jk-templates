import chalk from "chalk";
import { Command, Global } from "../libs/Application";
import Login from "../common/Login";
import Api from "../common/Api";

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
  @Global("Api")
  public api?: Api;
  @Global("Login")
  public login?: Login;

  public action = async () => {
    try {
      const user = await this.api?.user();
      if (!user) {
        throw new Error("user can not found");
      }
      console.log(chalk.green(`current login user is: ${chalk.blue(user.login)}`));
    } catch (error) {
      console.log(chalk.red("user can not found!"));
      console.log(12312);
      console.log(this.login);
      this.login?.confirm();
    }
  };
}

export default User;
