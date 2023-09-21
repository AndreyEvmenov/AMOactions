// модуль запроса на создание нового контакта
const fetch = require('node-fetch')
const refreshTokens = require('./refreshTokens')

async function createContact(name = '', email = '', phone = '') {
  const accessToken = await refreshTokens() // получаем access_token для обращения к API CRM
  const url = 'https://andreyevmenovru.amocrm.ru/api/v4/contacts'

  const data = [
    // подготавливаем данные для запроса
    {
      name: name,
      custom_fields_values: [
        {
          field_id: 2426205,
          field_name: 'Телефон',
          values: [{ value: '+' + phone }],
        },
        {
          field_id: 2426207,
          field_name: 'Email',
          values: [{ value: email }],
        },
      ],
    },
  ]

  try {
    // отправляем запрос на создание контакта
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })

    const res = await response.json()
    return res._embedded.contacts[0].id // возвращаем id созданного контакта
  } catch (error) {
    console.log('ERR>', error)
  }
}

module.exports = createContact
