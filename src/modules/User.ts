import chalk from "chalk";
import { Command, JKModule } from "../libs/Application";

/**
 * 个人认证
 */
@Command({
  command: "whoami",
  description: "who am i?",
  alias: "w",
})
class User extends JKModule {
  public action = async () => {
    try {
      const user = await this.ctx?.Api?.user();
      if (!user) {
        throw new Error("user can not found");
      }
      console.log(chalk.green(`current login user is: ${chalk.blue(user.login)}`));
    } catch (error) {
      console.log(chalk.red("user can not found!"));
      this.ctx?.Login?.confirm();
    }
  };
}

export default User;
