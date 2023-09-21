// Первичное получение access_token и refresh_token

async function postData(url = '', data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return await response.text()
}

const data = {
  client_id: 'dc3a3aa3-ee02-4e4e-a730-7b4ea949489f',
  client_secret:
    'efhnbE5S1f6X35bclgDlCobgnhl9dnXBl6BrhlQCv6qI7uFKhsjssD0ZZMQHidoW',
  grant_type: 'authorization_code',
  code: 'def5020096249fea04012bce0ed6a0918c506bae8a2f94145129b3f8931a1280f23c54249ef872de2424d8cbc09a3a59e8c28a42eb1420606892893462f06f66eb5a1f4974a6de8ed0e85feacb586eab26931a2b1472968a1cf5546ed054c9ec00bebd6ae2c7ae145c229e723ad5ca437775aff44c8629192d01ea87a4811b1b3af5b89f556182a70313fb5f547c3f84b52879e168490f925b7f6abf10af8349068aa239bc368efdd22e5fae9d3b35a76ea12684d94a1e2c934edbf6fb968b24a0af5e39af8ae314fc27a322b4d5eded4e01e3896be238e0157ad3e95afad45cb2478cec53b894419cb39bf5a27c94fae6e3943b3a835410ded92554025fa22f66014e191a01052246896456ddb68e1a2a3ab10b369c3acf82f54676bd476a79024e66f76b770598f6630488f1ee558584c53789f64b79b09ef8e098e09629287d0933ccb52894575c81a40e8504d6e4f31bb21cf86a33daf2711fd9a14a480f1239f32e8804c2877eac7dc37bed882f26f64c15a3b92d673f3b62bd7f5ca4617cacfa01a7816f33d4a55483e5d7317086518577a17cf39dd434d0e55cdff7c49cb0cb713e866e9ffce80771179924f8a538d7ba5fa7060034da9b28bbccc49e37febfce8eadd1059cbdc66b993f7a7a2ef8d7d9b17f85ba49ad473770b25c1cbc59e8080da4de7817cbd8f4628cfe101779c89851262e58d913',
  redirect_uri: 'https://4170-95-27-157-231.ngrok-free.app',
}

postData('https://andreyevmenovru.amocrm.ru/oauth2/access_token', data).then(
  (data) => {
    console.log(data)
  }
)
