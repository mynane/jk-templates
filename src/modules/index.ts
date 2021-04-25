import Login from "../common/Login";
import { Bootstrap } from "../utils/Bootstrap";
import { LoginCommand, LogoutCommand } from "./Auth";
import Module from "./Module";
import Use from "./Use";
import User from "./User";

@Bootstrap({
  modules: [User, LoginCommand, LogoutCommand, Module, Use],
  providers: [Login],
})
class App {}

export default new App();
