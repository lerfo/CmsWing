'use strict';
/**
 * model
 */
export default class extends think.model.base {

    /**
     * 用户登录认证
     * @param  string  $username 用户名
     * @param  string  $password 用户密码
     * @param  integer $type     用户名类型 （1-用户名，2-邮箱，3-手机，4-UID）
     * @return integer           登录成功-用户ID，登录失败-错误编号
     */
    async signin(username, password,ip, type = 1){
        let map={};
        switch (type) {
            case 1:
                map.username = username;
                break;
            case 2:
                map.email = username;
                break;
            case 3:
                map.mobile = username;
                break;
            case 4:
                map.id = username;
                break;
            default:
                return 0; //参数错误
        }
        let user = await this.where(map).find();
        if(!think.isEmpty(user) && user.status){
            /* 验证用户密码 */
            if(password === user.password){
                this.autoLogin(user,ip);//更新用户登录信息，自动登陆
                /* 记录登录SESSION和COOKIES */
                let userInfo = {
                    'uid'             : user.id,
                    'username'        : user.username,
                    'last_login_time' : user.last_login_time,
                };

                return userInfo; //登录成功，返回用户信息
            } else {
                return -2; //密码错误
            }
        } else {
            return -1; //用户不存在或被禁用
        }
  }

    /**
     * 自动登录用户
     * @param  integer $user 用户信息数组
     */
    async autoLogin(user,ip){
        /* 更新登录信息 */
        let data = {
            'last_login_time' : Date.now(),
            'last_login_ip'   : _ip2int(ip),
        };
        await this.where({id: user.id}).update(data);


    }
}