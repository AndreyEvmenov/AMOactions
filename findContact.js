// модуль поиска контакта по ключевому слову
// ищется соответствие по полям контакта таким как name, email, phone
// если найдено какое-либо совпадение, возвращаются данные контакта
// https://subdomain.amocrm.ru/api/v4/contacts?query=89123456789 - пример запроса

const fetch = require('node-fetch')
const refreshTokens = require('./refreshTokens')

async function findContact(searchText = '') {
  const accessToken = await refreshTokens()
  const url =
    'https://andreyevmenovru.amocrm.ru/api/v4/contacts?query=' + searchText
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await response.json()
    return {
      id: data._embedded.contacts[0].id, // уникальный id контакта в CRM
      name: data._embedded.contacts[0].name, // полное имя контакта
      email: data._embedded.contacts[0].custom_fields_values[0].values[0].value, // почта
      phone: data._embedded.contacts[0].custom_fields_values[1].values[0].value, // телефон
    }
  } catch (error) {
    return 'notexist' // если совпадения не нашлось, возвращается 'notexist'
  }
}

module.exports = findContact
