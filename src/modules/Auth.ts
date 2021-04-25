/* eslint-disable prefer-const */
import { Command } from "../utils/Bootstrap";
import Login from "../common/Login";

/**
 * login
 */
@Command({
  command: "login",
  description: "login account and synchronize data",
})
export class LoginCommand {
  private readonly Login?: Login;

  public action = async () => {
    this.Login?.action();
  };
}

/**
 * logout
 */
@Command({
  command: "logout",
  description: "logout account",
})
export class LogoutCommand {
  private readonly Login?: Login;

  public action = async () => {
    this.Login?.logout();
  };
}
