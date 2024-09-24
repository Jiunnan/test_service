var express = require('express');
var router = express.Router();
const fs = require('fs');

const result = {
    'returnStatus': 0,
    'returnMessage': 'upload API success',
    'returnData': ''
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(result).end();
});
  
/* POST user listing. */
router.post("/base64ToImageURL", function(req, res) {
    const reqData = req.body;
    // console.log('JN - api post:', reqData);
    const base64String = reqData.base64Image;
    console.log('JN - run tag - 1')
    let base64Str = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    console.log('JN - run tag - 2')
    let base64Data = Buffer.from(base64Str[2], 'base64');
    console.log('JN - run tag - 3')
    let nowTime = new Date();
    console.log('JN - run tag - 4')
    let imageName = '';
    console.log('JN - run tag - 5')
    if(base64String.includes('image/jpeg')){
        imageName = `image_${nowTime.getFullYear()}${nowTime.getMonth()}${nowTime.getDay()}${nowTime.getHours()}${nowTime.getMinutes()}${nowTime.getSeconds()}.jpeg`
        console.log('JN - run tag - 6', imageName)
    } else if(base64String.includes('image/png')){
        imageName = `image_${nowTime.getFullYear()}${nowTime.getMonth()}${nowTime.getDay()}${nowTime.getHours()}${nowTime.getMinutes()}${nowTime.getSeconds()}.png`
        console.log('JN - run tag - 7')
    }
    
    if(imageName != '') {
        fs.writeFile(`./public/images/${imageName}`, base64Data, function(err){
            console.log('JN - run tag - 8')
            if(!err){
                console.log('JN - run tag - 9')
                console.log('image is create.');
                result.returnMessage = 'image create success'
                result.returnData = {
                    imageURL: `https://test-service-lpak.onrender.com/images/${imageName}`
                }
                res.send(result).end();
            } else {
                console.log('JN - run tag - 10')
                result.returnMessage = `image create error: ${err}`;
                res.send(result).end();
            }
        });
    } else {
        console.log('JN - run tag - 11')
        result.returnMessage = 'image no create'
        res.send(result).end();
    }
});

module.exports = router;