/* eslint-disable prefer-const */
// import { Command } from "../utils/Bootstrap";
import { Command, Global, JKModule } from "../libs/Application";
import Login from "../common/Login";
import { IContext } from "../types/base.type";

/**
 * login
 */
@Command({
  command: "login",
  description: "login account and synchronize data",
})
export class LoginCommand extends JKModule {
  public action = async () => {
    this.ctx?.Login?.action();
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
    this.ctx?.Login?.logout();
  };
}
