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


const PORT = process.env.PORT || 3000
const application = express()

const router = express.Router()

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


router.use('/', serverRenderer)

// tell the app to use the above rules
application.use(router)


Loadable.preloadAll().then(() => {
  application.listen(PORT, () => {
    console.log(`SSR running on port ${PORT}`)
  })
})

