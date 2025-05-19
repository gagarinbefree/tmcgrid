import express, {Express} from 'express'
import cors from 'cors'
import router from './routes'
import bodyParser from 'body-parser'
import {errorHandler} from './errors/errors'

const app: Express = express()

const PORT: string = process.env.PORT ?? '8080'

app.use(cors())
app.use(bodyParser.json());
app.use(router)
app.use(errorHandler)

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
)