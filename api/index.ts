import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api')

app.get('/rank', async (c) => {
  try {
    const { name, tag } = c.req.query()

    const rawData = await fetch(`https://api.henrikdev.xyz/valorant/v2/mmr/eu/${name}/${tag}?api_key=HDEV-5cdfb84f-9133-4ce3-a27b-db30845e6f17`)
    const data = await rawData.json()

    const rank = data.current_data.currenttierpatched

    return c.json({message: `Your rank is ${'var not init'}`, data})
  } catch (error) {
    const {message} = error as Error
    return c.text(message)
  }
})

export default handle(app)
