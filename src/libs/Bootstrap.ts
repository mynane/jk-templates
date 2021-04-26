import Api from "../common/Api";
import Form from "../common/Form";
import Login from "../common/Login";
import Token from "../common/Token";
import User from "../common/User";
import app from "./Application";

const providers = [Login, Api, Token, User, Form];

app.providers(providers);

app.start();
