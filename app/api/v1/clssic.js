const Router = require("koa-router");
const router = new Router({
    prefix: "/v1/classic",
});

const {
    Flow
} = require("../../models/flow");

const {
    PositiveIntegerValidator
} = require("../../validators/validator");

const {
    Auth
} = require("../../../middlewares/auth");

const { Art } = require('../../models/art')

/**
 * 获取最新一期期刊
 * @params 最新一期index
 * @return content
 * @return id
 * @return
 */
router.get("/latest", new Auth().m, async (ctx, next) => {
    // 查询最大的index值 Max 把数据库的记录先进行排序  倒叙就是最新期刊的index
    const flow = await Flow.findOne({
        // order让整个数据库按照index来排序 DESC是倒叙
        order: [
            ["index", "DESC"]
        ],
    });
    const art = await Art.getData(flow.art_id, flow.type)
    art.setDataValue('index', flow.index)
    ctx.body = art;
});

module.exports = router;