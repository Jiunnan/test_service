var express = require('express');
var axios = require('axios');
var router = express.Router();

const line_token = 'E05KiAPpGxIR0E5w2fKYjQy3zkRQHTKJK0+Stq/BgMgBbg/C7XDdhFRgnqas6XDJAnyCP2cE+Amvlv+3qeHiDFkKQa3cUz7nHfvOa7zqKNFPvGqUaHEodoaYGgoz23ul/QyxqgOAzM5sxymJpo91RAdB04t89/1O/w1cDnyilFU=';
const line_api_path = 'https://api.line.me/v2/bot';

/* POST user listing. */
router.post("/send_message", async (req, res) => {
  const reqData = req.body;
  console.log('JN - api post:', reqData);
  const userId = reqData.userId;
  const messageText = reqData.messageText;
  const api_path = line_api_path + '/message/push'
  const jsonData = {
    'to': userId,
    'messages': [
        {
            'type': 'text',
            'text': messageText,
        },
        {
            'type': 'image',
            'originalContentUrl': 'https://pbs.twimg.com/media/E0ZdPT2VgAQOq6U.jpg',
            'previewImageUrl': 'https://pbs.twimg.com/media/E0ZdPT2VgAQOq6U.jpg'
        }
    ]
  };
  try {
    const response = await axios.post(
        api_path,
        jsonData,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${line_token}`
            }
        }
    )
    res.status(200).send(response.data).end();
  } catch (error) {
    console.log(`JN - send message api error:`, error);
    res.status(500),send({error: 'send message error'});
  }
});


module.exports = router;