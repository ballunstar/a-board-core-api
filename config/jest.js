module.exports = {
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'jest_pre_built_inspection_core_api',
    synchronize: true,
    logging: false,
  },
  redis: {
    host: 'localhost',
    port: 6379,
    password: 'password',
    disable: false,
  },
  mongo: {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    username: 'root',
    password: 'root',
    database: 'development_pre_built_inspection_core_api',
    disable: true,
  },
  inboundInterceptor: {
    enabled: true,
    target: 'mongodb',
  },
  credential: {
    prefix: 'userToken',
    secret: 'q^WxC2@9MpRxJ!7%Bw#_',
    expiresIn: 60 * 60 * 24, // 1 days
  },
  storage: {
    gcpServiceAccount:
      '{"type":"service_account","project_id":"pre-built-inspection-platform","private_key_id":"3ccf2f55ad03fe1f6ba70db7e14afc89283fb2bd","private_key":"-----BEGIN PRIVATE KEY-----\\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCRpSayrHi5xjMy\\njotmpNprky/rlZkSEpnmse6gj6U1lbGcdfdQawAt7JA/Z7ZD2S7+tNPUtKSgWgLl\\nRdaoumm2drT7XpbLZwFZBk7Iee01RjlZoobtGJ8bv2b6Js1wn+QE5zbxzqlXOV7N\\nQr3/uGktyuYqz2O87kqKhrMFlMMJglRb+tRtrDesV3mfOzHwHw9UC03dJkkj0lU3\\n7/a6dDhOWMx5uYGk8XG0WHUDgYaHqoavOHOkPdRFqyMN7X/wnPjm9uk3G6GLd+pL\\nmD7+HYuZNPsTXhJd6Ovtaog7GkGDsHwPk2EpZ11mytTpc9qzjBSIhOrVNa5p+McC\\nNfmBY/pnAgMBAAECggEARlX08c2kAcdrWyuGu7u6NcBfoIxe32D3TPc57/VfChkw\\nLIi1tnLuI79+S/iIh4yfiucF88+HP18ozdNj3pkjyzfZoBlmhnVIq9cFfgCP4y32\\nLUj1kxPUZuCQ2RabGRxGUG3e1XkBw7tTgpoMSq4isTgu3pbIKmoDupFhbD0S0YiS\\nIOl+1ZFtok+KWihL4GvaD4wGI7f9RlBL841ZWaAO4n+kEdC+wklaR5Mggz26lcaX\\nWp2UthFXvSJDKIwRf43BNDartggfSAPj/SKY/z5HrqxP3iHcMmdbdvdbzFR3iZkT\\np3b3yaYH8Ierf2ePCNwZ4jmbr3ZOhMYMjRbZhrk9AQKBgQDHFNvjaAObe0wBHnxE\\noWFNmR2TYYsRQR9V9RkqUfdlmCQ+9pBLNXYYsubeNPDAnzyUPMoR86x1ug/yPQyL\\n4cUw3xXHE8NkCB0TiG8hr3nccl8oEkogwA8lgO6UnA7e6xgloTjfIxGlZr0Lb5at\\nIm2omCUSMgAl+Wt+bpi97WD3ZwKBgQC7SS++Wb/lQxOxAyUYAGCII+TF2nr/WAP/\\nipcutYUjWbx7J9edQefeJxCEY+Y11GzKEjOhqUWA/7fORzWAyVLLcLyoj5A4C0pW\\nkOSxJdSHHAdoMNKy06XCJn64SCR7KBTvtKBTnZCSFqYBjby5FnRFowb7SuTTOu6a\\nVLru4KIFAQKBgQCK1oA3Ss3hPA6YZTNTBZz/af4XT5qV0O3Sm5kOS5WWc5Erm/ar\\njMAsn2+knhUcsLClzPM7q82lWLpQPMUoNK6504qziJPmikYE3kxqmJ8K33R/VKn/\\nxxGJHS7F00QHsLrpW1N3QlTHHixO8maJng4N2vVXiClUUmrmBKlfI1JRlwKBgQC1\\ndYGmwrqk3UrU9SEZkjP1dCGSec82XAbzr0ov3Xwz9hwij0Xffh20JtFgFJLWkQ0e\\n9GfGOIW5KQrj+Caks2te5cpE32RyiK3sFdMeuHKkvcmHb9aVoW83H6kjz/JYyUsP\\nvUih+0Y55WvOkY/LHTBm0EBRdg0jhDPuoC3GiSsyAQKBgQCehiaXc5SZAQriqQaG\\nio4wOGZxdHFJulthVQgenHPuq77OHrOlQscAeQwcqaRyiXErTYe/lpqg65Kg/5NF\\nLbmQybmS93I5xFImuxH0hZeR8CPj7rpYSRsuNksOjRtyKF3MECSqmRzfl0nYim3J\\nmTD2ZY42XjJtXXPUijBj9M82cw==\\n-----END PRIVATE KEY-----\\n","client_email":"pbi-bucket-access@pre-built-inspection-platform.iam.gserviceaccount.com","client_id":"115156982919333383801","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/pbi-bucket-access%40pre-built-inspection-platform.iam.gserviceaccount.com","universe_domain":"googleapis.com"}',
    gcpBucketName: 'pbi-public-file',
    gcpBucketPath: 'files',
    localDirectory: './upload',
  },
};