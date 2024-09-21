

















const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0l0L3NEeVRCUmV4bkxGK2RMN1BHQmVKRmx2Tm9xK3VIOEV3ZjZneWVGVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibVBpSG9VS0drVXJ5dWdYOEovendjKzJwbExuWUJzWldjNTV1ak1BbFdoQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSDVJcDBKMEtmK3NqcTdQSzdXeWhSeVdrYURaVGE4azhNQkhGaW5qNmxnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3M0V5M1lnUUNORFpVRnJOWXA3M0JLeXlDQm1hdVU0b0lSYzBPMk5iOFUwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVBVmhCTXg0WEVqNWFPa1JOUVZyYVN0RXVGSmhoV0QrTGZFUTkwRnF5a3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdMWmsrMGxzZjZJSlhLR1VlVkwzT1dza0U3MVdDU3RzVGdoNytlcXpGaVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR01yNXUyNlk2MXc3ZUVmRjU2OHVzdEdyQUJ5NGticWtrOWt6SEZMSWJGOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNmxvMGlXeEVjYnE3Y2wrdE5PMTVDbVdrSGs4clVaQlFTM0htVFZ3L0poRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBNaHNpQUFQNlRCNE51OGhtNVFtcHpEZWpmZTVJWVhlZnNWZHdvRXM3TWNmVDNsSmJFUGdmSjNnTFF2VjFxcmk0Z2RtbWpySjFzQnJZZkY3TjF3S0JnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ5LCJhZHZTZWNyZXRLZXkiOiJMeU9tWG1XTk5aaUg0ZnJva0tNdXR3VHhxYi9CcWhTL3JTNkVEbktLOFQ4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJESnFmV0JTOFF0QzVpc2dBQ1pvRmhnIiwicGhvbmVJZCI6IjMyNjk4NGYyLTAxNGYtNDZkNS05OWM5LTM2OWFmN2JlOTlmMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsQ3FHKzkxUER3RGY0dTV5UjYrbGxVQzJzeVE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNHJzRlRFMFErdE5Vc25iVmp5KzNVMS8raVhNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBKTDYxQ005IiwibWUiOnsiaWQiOiIyMzQ4MDU1NjA3MDM0OjE5QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMT2l3Y0FHRU92S3ZMY0dHQW9nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI5WjZhdnVmTWUrb25DMWhTeVRnVTJQeXFnZC9PU0c0TldWaXd0UG02bzNNPSIsImFjY291bnRTaWduYXR1cmUiOiJZR1NHeWxodTlKMVQ0c3VWYXZSdUQwQ2cxNnZ6RTc5YTlScENvM2VzcmN4dWNzWGdwNzVaeTBLdTI5R2srS2lSZE1Vak93cy9Dd0duRkdjRWNNQW1CUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiREhETWtmOWE5RmxBeVJEY2pTd1dsaUk1NzNtTWZGVzM5V2RKZUdYQ0crWUVQY1FwSUJWbDJDS2o0S1Z3cmUzcWpCNnJMbDNuTE9waDlGQ0pqRUJTRFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDU1NjA3MDM0OjE5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZXZW1yN256SHZxSnd0WVVzazRGTmo4cW9IZnpraHVEVmxZc0xUNXVxTnoifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjY5NDg3Mjh9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Carl William",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Carl William",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'Cyberion_V1',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

