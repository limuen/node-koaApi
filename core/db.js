const Sequelize = require("sequelize");
const {
  dbName,
  host,
  port,
  user,
  password,
} = require("../config/config").database;
const sequelize = new Sequelize(dbName, user, password, {
  dialect: "mysql",
  host,
  port,
  logging: true,
  timezone: "+08:00", // 东八时区
  define: {
    timestamps: true, // 是否生cretae_time, update_time delete_time
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true, // 把所有驼峰生成为下划线
  },
});

sequelize.sync({
    force: false  //删除表重新生成，只限于dev
})

module.exports = {
    sequelize
}
