const { defineConfig } = require("@vue/cli-service");

const url = 'http://localhost:8090'

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
		port: 8091, // 指定端口
		hot: true,
		// 代理配置
		proxy: {
			// 到底代理哪些接口
			'/api': { // 凡是接口中后面域名中带有api的请求框架都会进行一个代理转发
				target: url,  // 后端提供的接口地址
				changeOrigin: true, // 开启跨域代理
				logLevel: 'debug',
				pathRewrite: {
					'^/api' : '' // k:v 把请求中的 k 替换成 v
				}
			}
		},
		client: {
			webSocketURL: 'ws://0.0.0.0:8091/ws',
		}
	},
});
