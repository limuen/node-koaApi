const { sequelize } = require("../../core/db");

const { Sequelize, Model } = require("sequelize");

const { Art } = require('../models/art')

/**
 * 业务表
 */
class Favor extends Model {
    static async like(art_id, type, uid) {
        // 1. 添加记录
        // 2. 修改3个表的 fav_nums
        // 数据库事务 进行多个表操作，可以使数据一致性 （有一个操作失败，所有的操作取消。
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if(favor) {
            throw new global.errs.LikeError()
        }
        return sequelize.transaction(async t=> {
            await Favor.create({
                art_id,
                type,
                uid
            }, { transaction: t })
            const art = await Art.getData(art_id, type)
            await art.increment('fav_nums', { by: 1,transaction: t })
        })

    }
    static async dislike(art_id, type, uid) {
         // 1. 添加记录
        // 2. 修改3个表的 fav_nums
        // 数据库事务 进行多个表操作，可以使数据一致性 （有一个操作失败，所有的操作取消。
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if(!favor) {
            throw new global.errs.DislikeError()
        }
        return sequelize.transaction(async t=> {
            await favor.destroy({
                force: false,
                transaction: t
            })
            const art = await Art.getData(art_id, type)
            await art.decrement('fav_nums', { by: 1,transaction: t })
        })
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}