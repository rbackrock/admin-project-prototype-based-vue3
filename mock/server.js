const path = require('path')
const fs = require('fs')
const express = require('express')
const { createServer: createViteServer } = require('vite')
const Mock = require('mockjs')
const _ = require('lodash')

const PORT = 3000

function getMockMetadata() {
  const mockFileDirectory = path.join(process.cwd(), '/mock/request')
  const mockMetadata = []
  const mockFiles = fs.readdirSync(mockFileDirectory).filter((fileName) => path.extname(fileName) === '.js')

  mockFiles.forEach((mockFile) => {
    mockMetadata.push(require(mockFileDirectory + '/' + mockFile))
  })

  return _.flattenDeep(mockMetadata)
}

function makeFakeRoutes(app, mockMetadata = []) {
  const mocksForServer = mockMetadata.map(route => {
    const { url, type, response } = route

    return {
      url: url,
      type: type || 'get',
      respond(req, rsp) {
        rsp.json(Mock.mock(response instanceof Function ? response(req, rsp) : response))
      }
    }
  })

  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.respond)
  }
}

async function createServer() {
  const app = express()
  const vite = await createViteServer({
    server: { middlewareMode: 'html' }
  })

  makeFakeRoutes(app, getMockMetadata())

  app.use(vite.middlewares)

  app.listen(PORT)
}

createServer()