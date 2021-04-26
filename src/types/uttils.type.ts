import Api from "../common/Api";
import Auth from "../common/Auth";
import Form from "../common/Form";
import Token from "../common/Token";
import User from "../common/User";

export interface IUtil {
  Form?: () => Form;
  Token?: () => Token;
  Api?: () => Api;
  User?: () => User;
  Auth?: () => Auth;

  [key: string]: any;
}
