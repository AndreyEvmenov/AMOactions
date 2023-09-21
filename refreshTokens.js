// модуль обновления токенов
// проверяет истек токен или нет по дате сохраненной в config
// если токен устарел запрашивает новый access_token через refresh_token
// возвращает актуальный access_token

const fetch = require('node-fetch')
const fs = require('fs')

async function refreshTokens() {
  let fileContent = fs.readFileSync('./config/default.json')
  let config = await JSON.parse(fileContent)

  url = 'https://andreyevmenovru.amocrm.ru/oauth2/access_token'
  const data = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    grant_type: 'refresh_token',
    refresh_token: config.refresh_token,
    redirect_uri: config.redirect_uri,
  }

  if (config.expires_in - new Date() < 100000) {
    // проверяем дату истечения токена с запасом в 100 секунд
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })

    const newTokens = await response.json() // parses JSON response into native JavaScript objects
    config.access_token = newTokens.access_token
    config.refresh_token = newTokens.refresh_token
    config.expires_in = // рассчитываем новую дату истечения токена
      new Date().getTime() + (+newTokens.expires_in - 600) * 1000
    fileContent = JSON.stringify(config)
    fs.writeFileSync('./config/default.json', fileContent) // записываем новые токены и дату в конф файл
  }

  return config.access_token // возвращаем новый access_token
}

module.exports = refreshTokens
