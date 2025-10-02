import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const TMDB_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzM2OTJiZDExMmJiODBmMmIwMDgzOTQ5NjhhYzI4MiIsIm5iZiI6MTc1ODg3OTY4My44MjksInN1YiI6IjY4ZDY1ZmMzZmJiNDJhM2M5MDY5NzI3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7Qh8JxVQu5tQ4X0g1jfmwFiR1mDojAImMXu1qTSHcYE"
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'


async function fetchMovieData(endpoint) {
  const url = `${TMDB_BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}`
  
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })    
    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`)
      return []
    }
    
    const data = await response.json()
    console.log(`Fetched ${data.results?.length || 0} movies from ${endpoint}`)
    return data.results || []
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message)
    return []
  }
}

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  app.get('/favicon.ico', (req, res) => res.status(204).end())

  app.use('*', async (req, res, next) => {
    if (req.originalUrl.includes('.well-known')) {
      return res.status(204).end()
    }

    const url = req.originalUrl

    try {
      let template = await fs.readFile(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      )

      template = await vite.transformIndexHtml(url, template)

      let pageData = {}
      
      if (url === '/' || url === '') {
        console.log('🎬 Fetching movie data for homepage...')
        
        const [popularFilms, topRatedFilms, upcomingFilms] = await Promise.all([
          fetchMovieData('movie/popular'),
          fetchMovieData('movie/top_rated'),
          fetchMovieData('movie/upcoming')
        ])
        
        pageData = {
          popularFilms: popularFilms.slice(0, 20),
          topRatedFilms: topRatedFilms.slice(0, 20),
          upcomingFilms: upcomingFilms.slice(0, 20)
        }
        
        console.log('Movie data fetched successfully!')
        console.log(`Popular: ${pageData.popularFilms.length} movies`)
        console.log(`Top Rated: ${pageData.topRatedFilms.length} movies`)
        console.log(`Upcoming: ${pageData.upcomingFilms.length} movies`)
      }

      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

      const appHtml = render(url, pageData)

      const dataScript = `<script>window.__SSR_DATA__ = ${JSON.stringify(pageData)}</script>`

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace('</body>', `${dataScript}</body>`)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error('SSR Error:', e)
      next(e)
    }
  })

  app.listen(3000, () => {
    console.log('SSR Server running at http://localhost:3000')
    console.log('Visit: http://localhost:3000')
  })
}

createServer()
