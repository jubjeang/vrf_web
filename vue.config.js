module.exports = {
  devServer: { 
      // https:true,//deploy server
      disableHostCheck: true,
      port: process.env.PORT,
      public:  process.env.PORT_PUBLIC,
      proxy: process.env.VUE_APP_API_URL
  },
  publicPath: "/"
}