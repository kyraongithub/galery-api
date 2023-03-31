import createServer from './utils/server'

const app = createServer()
const port = 4000

app.listen(port, () => console.log(`Server is listening on port ${port}!`))
