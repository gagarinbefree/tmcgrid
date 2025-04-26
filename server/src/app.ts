import express, { Express } from 'express'
import cors from 'cors'
import todoRoutes from './routes'

const app: Express = express()

const PORT: string = process.env.PORT ?? '8080'

app.use(cors())
app.use(todoRoutes)

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
)