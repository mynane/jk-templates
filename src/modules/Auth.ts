/* eslint-disable prefer-const */
// import { Command } from "../utils/Bootstrap";
import { Command, JKModule } from "../libs/Application";

/**
 * login
 */
@Command({
  command: "login",
  description: "login account and synchronize data",
})
export class LoginCommand extends JKModule {
  public action = async () => {
    await this.ctx?.Login?.action();
  };
}

/**
 * logout
 */
@Command({
  command: "logout",
  description: "logout account",
})
export class LogoutCommand extends JKModule {
  public action = async () => {
    await this.ctx?.Login?.logout();
  };
}
