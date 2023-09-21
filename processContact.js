// основной модуль логики проверки полученных в запросе данных
// проверяет если совпадение email или телефона
// если нет совпадений создает новый контакт, логика реализована максимально примитивная
// после обновления или создания контакта создается новая сделка от имени контакта

const findContact = require('./findContact')
const updateContact = require('./updateContact')
const createContact = require('./createContact')
const createLead = require('./createLead')

async function processContact(name, email, phone) {
  const keywords = [email, phone] // проверяем по email и телефону
  let contactId
  for (let word of keywords) {
    const result = await findContact(word)
    if (result !== 'notexist') {
      // если найдено совпадение, обновляем данные контакта по его id
      await updateContact(result.id, name, email, phone)
      contactId = result.id // запоминаем id контакта для последуегощего создания сделки
    } else {
      contactId = await createContact(name, email, phone) // если нет совпадения создаем новый контакт
    }
  }
  await createLead(contactId) // создаем новую сделку
}

module.exports = processContact
