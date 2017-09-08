const express = require('express')
const app = express()
const api = require('./src/api/collection')
const jade = require('jade')

app.set('views', './src/views')
app.set('view engine', 'jade')

app.get('/', (req, res) => {
    api.getThemes().then((themes) => {
        res.render('hello', { title: 'Hey', message: themes})
    }).catch(e => {
        console.log(e)
    })

})

app.listen(8081)
