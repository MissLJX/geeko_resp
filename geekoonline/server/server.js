import path from 'path'
import fs from 'fs'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import App from '../src/App'
import Loadable from 'react-loadable'


const PORT = process.env.PORT || 3000
const application = express()

const router = express.Router()

application.use(express.static(path.resolve(__dirname, '../build')))
application.use(express.static(path.resolve(__dirname, '../public')))

const serverRenderer = (req, res, next) => {

  const context = {}
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App/>
    </StaticRouter>
  )



  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${app}</div>`
      )
    )
  })
}


router.use('/', serverRenderer)


// tell the app to use the above rules
application.use(router)


Loadable.preloadAll().then(() => {
  application.listen(PORT, () => {
    console.log(`SSR running on port ${PORT}`)
  })
})

