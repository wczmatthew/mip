export const SUCCESS = 200; // 成功code
export const LOGINERR = 1066; // 登录失效
export const FAIL = -1; // 失败code
export const LOGOUT = 1600; // 退出登录
export const EASEMOCKHOST = 'https://www.easy-mock.com/mock/5b85f4edb6eb682fc7f9efca/chint'; // ease-mock 的地址
export const MOCKHOST = 'http://result.eolinker.com/WBwZGMIb4e65524151e9e3de2c3e006fdacbc66ae2119c2?uri='; // eolinker-mock 的地址

export const baseUrl = process.env.NODE_ENV === 'production' ? '/MobileOa/Html/#' : '/#';