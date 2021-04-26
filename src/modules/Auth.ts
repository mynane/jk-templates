/* eslint-disable prefer-const */
// import { Command } from "../utils/Bootstrap";
import { Command, Global } from "../libs/Application";
import Login from "../common/Login";
/**
 * login
 */
@Command({
  command: "login",
  description: "login account and synchronize data",
})
export class LoginCommand {
  @Global("Login")
  public login?: Login;

  public action = async () => {
    this.login?.action();
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
  @Global("Login")
  public login?: Login;

  public action = async () => {
    this.login?.logout();
  };
}
