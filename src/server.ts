import { env } from './env.js'
import { app } from './app.js'

app.listen({ port: env.PORT, host: '0.0.0.0' })
