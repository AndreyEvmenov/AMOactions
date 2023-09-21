// Модуль обновления данных контакта
// по id контакта обновляет его Имя Почту и Телефон

const fetch = require('node-fetch')
const refreshTokens = require('./refreshTokens')

async function updateContact(id = 0, name = '', email = '', phone = '') {
  const accessToken = await refreshTokens() // получаем access_token для обращения к API CRM
  const url = 'https://andreyevmenovru.amocrm.ru/api/v4/contacts/' + id

  // подготавливаем данные для запроса
  const data = {
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
  }

  try {
    // выполняем запрос
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })

    // const res = await response.json()
  } catch (error) {
    console.log('ERR>', error)
  }
}

module.exports = updateContact
