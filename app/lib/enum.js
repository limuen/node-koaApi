
function isThisType(val) {
    for(let key in this) {
        if(this[key] === parseInt(val)) {
            return true
        }
    }
    return false
}

const LoginType = {
    USER_MINI_PROGRAM: 100,
    USER_EMAIL: 101,
    USER_MOBILE: 102,
    ADMIN_EMAIL: 200,
    isThisType
}

module.exports = {
    LoginType
}

// INSERT INTO `qlkj`.`m_button`( `name`,`descr`, `add_user`, `update_user`, `menu_id`, `menu_name`, `seq`, `icon_cls`, `click_script`, `postion`, `language`, `platform`) VALUES ('车辆配件-车辆管理-车辆列表-二维码',  'modelInfo_vehicleadmin_exqrcode', '', '', 30, 'modelInfo', 1, '', '', 1, 'cn', 1);

// INSERT INTO `qlkj`.`m_rule_button`(  `add_user`, `update_user`, `rule_id`, `button_id`) VALUES ('', '', 1, 4054);
// INSERT INTO `qlkj`.`m_rule_button`( `add_user`, `update_user`, `rule_id`, `button_id`) VALUES ( '', '', 1, 4055);

// INSERT INTO `qlkj`.`m_button`( `name`, `descr`, `add_user`, `update_user`, `menu_id`, `menu_name`, `seq`, `icon_cls`, `click_script`, `postion`, `language`, `platform`) VALUES ('车辆配件-车辆信息-车辆列表-开电池锁', 'carmanag_manage_openbattery', '', '', 13, 'carmanag', 1, '', '', 1, 'cn', 1);
// INSERT INTO `qlkj`.`m_button`( `name`, `descr`, `add_user`, `update_user`, `menu_id`, `menu_name`, `seq`, `icon_cls`, `click_script`, `postion`, `language`, `platform`) VALUES ('车辆配件-车辆信息-车辆列表-关电池锁', 'carmanag_manage_closebattery', '', '', 13, 'carmanag', 1, '', '', 1, 'cn', 1);
