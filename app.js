const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const database = [
  { id: 1, title: '글1' },
  { id: 2, title: '글2' },
  { id: 3, title: '글3' },
]

const userData =  [
  {id: 1, username: 'min', password: 'min'}
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


// GET : 회원 조회
app.get('/users', (req, res) => {
  res.send(userData)
})


// POST : 회원추가
app.post('/signup', (req, res) => {
  const {username, password, age, birthday} = req.body;
  userData.push({
    username,
    password,
    age,
    birthday
  })
  res.send('success')
})


app.post('/login', (req, res) => {
  const {username, password} = req.body;
  const user = userData.filter((user) => {
    return user.username === username // DB안에 이름 === 작성한 이름
  })

  if (user.length === 0) {
    res.send('해당하는 id가 없습니다.');
    return
  }

  if (user[0].password !== password) {
    res.send('패스워드가 틀립니다.')
    return
  }

  res.send('로그인 성공!')
})



app.listen(3000, () => {
  console.log('server start !!')
})
