const jwt = require("jsonwebtoken");

const validUser = (req, res, next) => {
  const {access_token} =  req.cookies;
  if (!access_token) {
    res.status(401).send('access token이 없습니다.')
  }

  try {
    // access_token 이 암호화 되어있어서 해제, 그래야지 username 을 알 수 있음
    const {username} = jwt.verify(access_token, 'secure')
    const userInfo = userData.find((data) => data.username === username)
    if (!userInfo) {
      throw 'userInfo 가 없습니다.'
    }
  next()
  } catch (err) {
    res.status(401).send('유효한 access token 이 아닙니다.')
  }

}

module.exports = {
  validUser
}