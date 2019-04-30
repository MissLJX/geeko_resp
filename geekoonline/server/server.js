import path from 'path'
import fs from 'fs'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import serialize from 'serialize-javascript'

import App from '../src/App'
import routes from '../src/routes'
import Loadable from 'react-loadable'
import {sendEmail} from './email'


const PORT = process.env.PORT || 3000
const application = express()


const router = express.Router()

const multer = require('multer')
const bin = multer({dest:'bin'});//用来保存文件的文件夹名称

application.use('/static', express.static(path.resolve(__dirname, '../build/static')))
application.use('/images', express.static(path.resolve(__dirname, '../public/images')))

const serverRenderer = (req, res, next) => {

  

  const {route, match} = matchRoutes(routes, req.url)[0]

  let promise
  if(route.loadData){
    promise = route.loadData(match.params)
  }else{
    promise = Promise.resolve(null)
  }



  promise.then(data => {

    const context = { data }

    const app = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App/>
      </StaticRouter>
    )
  
    
  
    fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('An error occurred')
      }
      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${app}</div>`
        ).replace(
          '<title>React App</title>',
          `<title>${route.title}</title>`
        ).replace(
          '</body>',
          `<script>window.__ROUTE_DATA__ = ${serialize(context.data)}</script></body>`
        )
      )
    })




  })


}


router.post('/api/personal', bin.single('file') , function(req, res, next){
  var filename = req.file.originalname
  fs.renameSync('./bin/'+req.file.filename,'./bin/'+filename)

  const {name, phone, email, info, position} = req.body

  console.log(req.body)

  let mailOptions = {
    from: 'ziruxi@qq.com', // sender address
    to: 'xialuping@geeko.online', // list of receivers
    subject: `${ position } | ${name} | ${phone} | ${email}`, // Subject line
    // 发送text或者html格式
    // text: `${info}`, // plain text body
    html: `<b>${ position } | ${name} | ${phone} | ${email}</b><br/><p>${info}</p>`, // html body
    attachments: [
      {
        filename: filename,
        path: './bin/'+filename
      }
    ]
  }
  sendEmail(mailOptions)
  res.send('投递成功!!!')
})


router.use('/', serverRenderer)

// tell the app to use the above rules
application.use(router)


Loadable.preloadAll().then(() => {
  application.listen(PORT, () => {
    console.log(`SSR running on port ${PORT}`)
  })
})

