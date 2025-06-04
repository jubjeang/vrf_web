module.exports = {
  devServer: { 
      https:true,//deploy server
      disableHostCheck: true,
      port: process.env.PORT,
      public:  process.env.PORT_PUBLIC,
      proxy: process.env.VUE_APP_API_URL
  },
  publicPath: "/",
  chainWebpack: config => {
    config.module
      .rule('pdf')
      .test(/\.pdf$/)
      .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'assets/docs/[name].[hash:8].[ext]'
        });
  }
}