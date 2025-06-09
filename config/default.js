module.exports = {
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'development_a_board_core_api',
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
    host: '68.183.183.39',
    port: 27017,
    database: 'development_prebuilt_inspection_platform_core_api',
    username: 'development_prebuilt_inspection_platform_core_api',
    password: 'CVzk2AxUwEj8a8FH7kt2FBY9V6yMu3sx',
    disable: false,
  },
  inboundInterceptor: {
    enabled: true,
    target: 'mysql',
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
  serviceAccount: {
    googleSheet: 
    '{"type":"service_account","project_id":"pre-built-inspection-platform","private_key_id":"90d6db78f1954654588cb36480a2d84ed6ab6b88","private_key":"-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDikUIfOpfgfxeG\\nN+U/6LLUZgujMnDO9VYEEKHIsuPZ7e+6GsKijCN33Z/ZsWcfUT6CWjvT/BGZrH6w\\n2y70v8X5TdR4bO4MwmsNitcE2YK+HOnAUedsbW+zchdgBlUS1zSVPNg5tKHbny82\\nxa+yfp/M5iNsTMLr0sjmb/FXLQC7Yk62FFVlFI7UdG4+6roDTUjZxoRB0xAdBOri\\n9zVQyhYLmyY3PaW0x0M78CJ9aFJzJ15fnBLlGHZFl+wgO/Dp2lXz48RFYK3N28cF\\nb/Ziic8QiaFy2qK5OsRhfE0gHU6zyatCvLiXgdnuMTd2sP2oWl6hHGNUObt3KIjB\\n6v91Do1TAgMBAAECggEAan4EKlGMGYUjNX8ITiW+CH9+cNLAm0ZNi9OVd5Q97K0d\\nxMfXPDfKZAjTnar44Yt6aiKnhFgynZyqX85mH7wT/b5LY98vdOfdEZx0vF7QSTOl\\n2zOkJx65Jgs2WXggfJ6SpKLYrybr/SKxOnlov+ksi06Qz9K0u8tzinyLX4JTmb8U\\nwhgBedDMt0YutkBcaDiwqaCLLSAmkAid8orfkkRqmmlmSfeDxtRpd9iqedzrohmp\\nE5iWQIIUS53GXrndsPhpf+2tx59smJcgPM2OfYOnBThmlwQogomy5+hS1P9emtHS\\neYCRdHXEq/0pofGnKKpV/RX15V0shaEWgrXcszL6QQKBgQD8ZCO3ZSyLX84vy0xn\\nVMe2bdw6F3a/ZnZPtiK4M9WvByHz365hmDBeQLqixYuBwaZBWaAGeO/zhiFvFn/U\\njSfUTk8BD3Dayq38LcR9aZCLp51f6Io7rZJbqMCPzo2P5ZBXNjJGY+v2vDE/IjAx\\naSG8mzifId8NnPZHsEjen5FCSQKBgQDlzpe7AVEa5BZSKSnAvhp1HZ6GBW8RDWSj\\nQpBS/EcJLw6VE8vrRLYjzq37wgotv0GHBed9RX6aGm4gyT4V0rDB3kytwi04ommW\\nr4gCPQDODoqf4x1yIEh1mzhxP7mq14c84na989U89/F/AKvv9pt5TkrLDN1OY9cA\\npY8eVPoSuwKBgQDPfav3O4/xTOP/Ws0HLiW5jnu8rkmLdLrTMVM9yC9l4yFAkqWT\\nykAJXIGTC4BzPjZmBz6N06LAu4aFAyQ4I4uY+H/uyTjoRjPe2+lriPuyNCwnCs+J\\n3Fo0THlyQEcVA480g3O1drQodfKuinbASEPaAGn+OSRc1quJqB1gGCKdMQKBgQC7\\np7PnFPAx0UcY2Fwr9BCOyh0Eu7MybYlcd6J64V7wdOine37tIzLIkqEoEA9Xw/Gy\\nXHPnq7PyCtsbEroL//wuk2RyDzn2IUmvrq6VhVL+8Ijqfv8wjoQc5R91+t+WTmE0\\nqojkHBRosN8XImlEjk/vAqu4m0ysEoMjGA6Cakm6uQKBgHq3HpeBpUKvAuMuXIAj\\n+yJ+4P1M6r9b0m+r7sKsXes4whZixis6Po5J6QGLr+njK/ShghlFqg+Ixc281C4c\\nVeX6swyOQaVrFnCp2cvnla6EGA/aIxGjnHeZ2orYwmF9bdOOjm0Dsej+VJdEcw30\\nCI5LFc/6/fl1x5muZVYDLIsR\\n-----END PRIVATE KEY-----\\n","client_email":"spreadsheet-reader-sa@pre-built-inspection-platform.iam.gserviceaccount.com","client_id":"103345635400557646326","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/spreadsheet-reader-sa%40pre-built-inspection-platform.iam.gserviceaccount.com","universe_domain":"googleapis.com"}',
  },
};
