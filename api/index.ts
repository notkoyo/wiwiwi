import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api')

app.get('/rank/:name/:tag', async (c) => {
  const username = c.req.param('name')
  const tag = c.req.param('tag')

  const rawData = await fetch(`https://api.henrikdev.xyz/valorant/v2/mmr/eu/${username}/${tag}?api_key=HDEV-5cdfb84f-9133-4ce3-a27b-db30845e6f17`)
  const data = await rawData.json()

  const rank = data.current_data.currenttierpatched

  return c.json({message: `Your rank is ${rank}`})
})

export default handle(app)
