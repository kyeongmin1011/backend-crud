const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const database = [
  { id: 1, title: '글1' },
  { id: 2, title: '글2' },
  { id: 3, title: '글3' },
]


// 첫 페이지
app.get('/', function (req, res) {
  res.sendFile(__dirname+'/views/index.html')
})


// GET: 조회
app.get('/database', (req, res) => {
  res.send(database)
})


// GET : 특정아이디 조회
app.get('/database/:id', (req, res) => {
  const id = req.params.id; // String
  const data = database.find(el => el.id === Number(id));
  res.send(data)
})


// POST : 생성
app.post('/database', (req, res) => {
  const title = req.body.title
  database.push({
    id: database.length + 1,
    title
  })
  res.send('값 추가가 완료되었습니다.')
})


// PUT : 수정
app.put('/database', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  database[id - 1].title = title
  res.send('값 수정이 완료되었습니다.')
})


// DELETE : 삭제
app.delete('/database', (req, res) => {
  const id = req.body.id;
  database.splice(id - 1,1)
  res.send('값 삭제가 완료되었습니다.')
})


app.listen(3000, () => {
  console.log('server start !!')
})