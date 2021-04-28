/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-async-promise-executor */
/* eslint-disable prefer-const */
import chalk from "chalk";
import cors from "cors";
import express from "express";
import open from "open";
import Constant from "../config/constant";
import { JKUtil } from "../libs/Application";

const loginUrl = (): string => {
  const CLIENT_ID = "Iv1.f92a3890970ecc1e";
  const CLIENT_SECRET = "d6ae5fbd1189ea0577b2a1b01ba0d3b902e6f3cc";
  const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
  return url;
};

class Login extends JKUtil {
  public timer?: any;
  public setTimer() {
    this.timer = setTimeout(() => {
      console.log(chalk.white(`If it is not opened with the default browser, please copy the link to access`));
      console.log();
      console.log(chalk.blue(loginUrl()));
      console.log();
    }, 10000);
  }
  public async confirm() {
    try {
      await this.ctx?.Form?.confirm("Are you sure you want to login again?");
      await this.action();
    } catch (error) {}
  }

  public async logout() {
    await this.ctx?.Token?.save("");
    console.log(chalk.green("logout success"));
  }

  public async action() {
    return new Promise(async (resolve, reject) => {
      let server: any;
      const app = express();

      app.use(
        cors({
          origin: "https://www.jikequan.net",
          credentials: true,
        })
      );
      app.get("/oauth", async (req: any, res: any) => {
        clearTimeout(this.timer);
        await this.ctx?.Token?.save(req.query?.token);
        try {
          const user = await this.ctx?.Api?.user();
          if (!user) {
            throw new Error("user not found");
          }
          await this.ctx?.User?.save(JSON.stringify(user));
          console.log(chalk.green(`login success: ${chalk.blue(user?.login)}`));
          res.end(JSON.stringify({ code: 0, data: "success" }));
          resolve({ code: 0, data: "success" });
        } catch (error) {
          console.log(chalk.red(`login failed: ${error}`));
          res.end(JSON.stringify({ code: -1, data: "fail" }));
          reject({ code: -1, data: "fail" });
        }
        server?.close(function () {});
      });
      server = await app.listen(Constant.AUTH_PORT);
      console.log(chalk.green("wait for authorize by github account"));
      open(loginUrl());
      this.setTimer();
    });
  }
}

export default Login;
