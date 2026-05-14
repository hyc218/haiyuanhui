const cloudbase = require('@cloudbase/node-sdk')

const app = cloudbase.init({
  env: 'haiyuanhui888888-d1eqfjyea6385c6',
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY,
})

const storage = app.storage()

// CloudBase 云存储默认域名
const STORAGE_HOST = 'https://haiyuanhui888888-d1eqfjyea6385c6.tcloudbaseapp.com'

module.exports = { app, storage, STORAGE_HOST }
