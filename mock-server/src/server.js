import fs from 'node:fs'
import path from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import cookieParser from 'cookie-parser'
import express from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const routesDir = path.join(__dirname, 'routes')

const setupRoutes = async (app) => {
  const files = fs.readdirSync(routesDir)

  await Promise.all(
    files.map(async (file) => {
      if (file.endsWith('.js')) {
        const routeURL = pathToFileURL(path.join(routesDir, file))
        const routeModule = await import(routeURL.href)
        for (let i = 0; i < routeModule.default.length; i++) {
          const route = routeModule.default[i]
          app[route.method](route.path, route.handler)
        }
      }
    }),
  )
}

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
  // 共通ミドルウェアでレスポンスを50ms遅らせる
  setTimeout(() => {
    next()
  }, 50)
})
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

setupRoutes(app)

app.use((err, req, res, next) => {
  console.error(err.stack)

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
