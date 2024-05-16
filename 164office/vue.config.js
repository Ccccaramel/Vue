const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
	transpileDependencies: true,
	chainWebpack(config) {
		config.plugin('html').tap((args) => { //标题
			args[0].title = 'ding!office！(●\'◡\'●)';
			return args;
		})
	},
	// publicPath:'/',  // 请求根路径,即"/",与 process.env.BASE_URL 对应,一般不做修改
	outputDir: process.env.outputDir,
	devServer: {
		open: true, // 启动成功自动在浏览器中打开
		host: 'ding.office.com',
		allowedHosts: [
			"ding.office.com"
		],
		port: 80, // 指定端口
		hot: true,
		// 正向代理配置,nginx 是反向代理
		proxy: {
			// 到底代理哪些接口
			'/api': { // 凡是接口中后面域名中带有api的请求框架都会进行一个代理转发
				target: 'http://127.0.0.1:8090',  // 本地 后端提供的接口地址
				changeOrigin: true, // 开启跨域代理
				logLevel: 'debug',
				pathRewrite: {
					'^/api' : '' // k:v 把请求中的 k 替换成 v
				}
			},
			'/wsLink': {
				target: 'http://127.0.0.1:8090',  // 本地 后端提供的接口地址
				changeOrigin: true, // 开启跨域代理
				logLevel: 'debug',
				pathRewrite: {
					'^/wsLink' : '' // k:v 把请求中的 k 替换成 v
				}
			}
		},
		client: {
		},
	},
});
