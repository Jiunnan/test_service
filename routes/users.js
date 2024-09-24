var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST user listing. */
router.post("/test_post", function(req, res) {
  const reqData = req.body;
  reqData.bbb = "bbb"
  const aaaData = reqData.aaa
  console.log('JN - api post:', reqData)
  console.log('JN - aaaData:', aaaData)
  res.send({status: 0, reqData}).end();
});


module.exports = router;