import Api from "../common/Api";
import Auth from "../common/Auth";
import Form from "../common/Form";
import Login from "../common/Login";
import Module from "../common/Module";
import Token from "../common/Token";
import User from "../common/User";

export interface IBase {
  command?: string;
  options?: string[][];
  description?: string;
  alias?: string;
  action?: (type: any, name: any) => void;
  [key: string]: any;
}

export interface IContext {
  Login?: Login;
  Api?: Api;
  Module?: Module;
  Form?: Form;
  Auth?: Auth;
  User?: User;
  Token?: Token;
}
