import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api')

app.get('/', (c) => {
  const rawData = fetch('https://api.henrikdev.xyz/valorant/v2/mmr/eu/DreaLeFay/9031?api_key=HDEV-5cdfb84f-9133-4ce3-a27b-db30845e6f17')

  return c.json(rawData)
})

export default handle(app)
