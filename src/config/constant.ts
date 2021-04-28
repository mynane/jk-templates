import path from "path";

class Constant {
  // 获取项目仓库正则
  static REPOI_RE = /origin\t(.+)\s\(fetch\)/;
  // 项根目录路径
  static ROOT = process.env.HOME || process.env.USERPROFILE || "";
  // jk root 目录
  static JK_ROOT = path.join(Constant.ROOT, "/.jkt");
  // jk配置路径
  static JK_CONFIG = path.join(Constant.ROOT, "/.jkt/config");
  // jk配置路径
  static JK_TOKEN = path.join(Constant.ROOT, "/.jkt/token");
  // jk user配置路径
  static JK_USER = path.join(Constant.ROOT, "/.jkt/user");
  // url前缀
  static PREFIX = "https://www.jikequan.net/api";
  // 多久检测一次版本
  static checkVersionTimeInterval = 60 * 60 * 1000;
  // auth port
  static AUTH_PORT = 65436;
}

export default Constant;
