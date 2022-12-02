const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
	transpileDependencies: true,
	chainWebpack(config) {
		config.plugin('html').tap((args) => { //标题
			args[0].title = '在吗?';
			return args;
		})
	},
	devServer: {
		open: true, // 启动成功自动在浏览器中打开
		// host: 'localhost',
		// host: 'local-ip',
		host: '0.0.0.0',
		// host: '10.109.21.63',
		// host: '121.36.141.65',
		allowedHosts: [
			"hyld.office.com"
		],
		port: 80, // 指定端口
		hot: true,
		// 正向代理配置,nginx 是反向代理
		proxy: {
			// 到底代理哪些接口
			'/api': { // 凡是接口中后面域名中带有api的请求框架都会进行一个代理转发
				// target: 'http://10.109.21.63:8090',  // 本地 后端提供的接口地址
				target: 'http://127.0.0.1:8090',  // 本地 后端提供的接口地址
				// target: 'http://121.36.141.65:8090',  // 云 后端提供的接口地址
				changeOrigin: true, // 开启跨域代理
				logLevel: 'debug',
				pathRewrite: {
					'^/api' : '' // k:v 把请求中的 k 替换成 v
				}
			}
		},
		client: {
			// webSocketURL: 'ws://' + url + '/ws', // test
			// webSocketURL: 'ws://164office.cn/ws', // 本地前-云
			// webSocketURL: 'ws://127.0.0.1/ws', // 云-云
		},
		// defineConfig: {
		// 	host: '10.109.21.63',
		// }
	},
});
