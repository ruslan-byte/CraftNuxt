// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
	head:{
		script:[
			{
				src: "/js/main.js",
				body:true
			},
			{
				src: "/js/vendor.js",
				body:true
			},
		]
	},
  },
  	publicRuntimeConfig: {
		API_BASE_URL: process.env.API_BASE_URL
	},
})