const requireDirectory = require("require-directory");
const Router = require("koa-router");

class InitManager {
  static initCore(app) {
      // 入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
    // loadHttpException这种方法导致如果写错都不报错
    // InitManager.loadHttpException()
    // 引入环境
    InitManager.loadConfig()
  }
  
  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }


  static initLoadRouters() {
    // path config
    const apiDirectory = `${process.cwd()}/app/api`;
    requireDirectory(module, apiDirectory, { visit: whenLoadModule });

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }

  /**
   * 定义全局http类 不用每次都要导入
   */
  static loadHttpException() {
    const errors = require('./http-exception')
    global.errs = errors
  }
}

module.exports = InitManager
