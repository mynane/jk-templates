import Api from "../common/Api";
import Auth from "../common/Auth";
import Config from "../common/Config";
import Form from "../common/Form";
import Loading from "../common/Loading";
import Login from "../common/Login";
import Module from "../common/Module";
import Token from "../common/Token";
import User from "../common/User";
import Version from "../common/Version";
import Website from "../common/Website";
import app from "./Application";

const providers = [Login, Api, Token, User, Form, Auth, Module, Loading, Version, Config, Website];

app.providers(providers);

app.start();
