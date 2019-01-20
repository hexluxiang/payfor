import Axios from "axios"
//用户登录
const url = 'http://192.168.101.3/pay/renrenpay/renrenpay_alipay_h5_pay.aspx';
export const payFor = function(data) {
    return Axios.get(url, {
        params: {
            uid: data.uid,
            user_name: data.user_name,
            trans_amount: data.trans_amount,
            app_terminal: data.app_terminal
        }
    })
}