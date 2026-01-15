import { env } from './env.js'
import { app } from './app.js'

app
  .listen({ port: env.PORT, host: '0.0.0.0' })
  .then(() => {
    app.log.info('Server running on port')
  })
  .catch((err) => {
    console.error('Error starting server:', err)
    process.exit(1)
  })
