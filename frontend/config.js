import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()

export const API = publicRuntimeConfig.PRODUCTION ? 'https://MB-Blog.com' : publicRuntimeConfig.API_DEVELOPMENT;
export const APP_NAME = publicRuntimeConfig.APP_NAME;