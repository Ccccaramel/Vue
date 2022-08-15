const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
	chainWebpack(config) {
		config.plugin('html').tap((args) => { //标题
			args[0].title = '在吗?';
			return args;
		})
  },
  devServer:{
	port: 8091
  },
});
