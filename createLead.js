// модуль запроса на создание сделки
const fetch = require('node-fetch')
const refreshTokens = require('./refreshTokens')

async function createLead(id = 0) {
  // создаем сделку с id контакта
  const accessToken = await refreshTokens() // получаем access_token для обращения к API CRM
  const url = 'https://andreyevmenovru.amocrm.ru/api/v4/leads'

  // подготавливаем данные для запроса
  const data = [
    {
      id: 'тестовая сделка',
      price: 500,
      _embedded: {
        contacts: [{ id: id }],
      },
    },
  ]

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.log('ERR>', error)
  }
}

module.exports = createLead
