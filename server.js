// модуль HTTP сервера, принимающего запросы на выполнение действий с CRM

// ngrok start --all  tunnel start
// ngrok http 3000
// 5501-95-27-157-231.ngrok-free.app

// ОБРАЗЕЦ ЗАПРОСА:
// https://5501-95-27-157-231.ngrok-free.app/contact?name=Иван%20Иванов&email=ivan@mail.ru&phone=79993232323

const processContact = require('./processContact')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<h1>AMO Contacts & Leads</h1>')
})

app.use('/contact', (req, res) => {
  let name = req.query.name
  let email = req.query.email
  let phone = req.query.phone
  processContact(name, email, phone)
  res.send('<h1>Processed</h1>')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
