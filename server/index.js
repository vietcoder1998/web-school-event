const express = require('express')
var cors = require('cors')

const app = express()
const port = 3006
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send({
        code: 200,
        msg: 'Thành công',
        data: {
            name: 'JobChoice'
        }
    })
}) 

app.listen(port, () => console.log(`Example app listening on port ${port}!`))