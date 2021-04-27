import Api from "../common/Api";
import Auth from "../common/Auth";
import Form from "../common/Form";
import Loading from "../common/Loading";
import Login from "../common/Login";
import Module from "../common/Module";
import Token from "../common/Token";
import User from "../common/User";
import Version from "../common/Version";
import app from "./Application";

const providers = [Login, Api, Token, User, Form, Auth, Module, Loading, Version];

app.providers(providers);

app.start();
