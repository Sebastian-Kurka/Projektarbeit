import { createRequire } from 'module'
const require = createRequire(import.meta.url)

import cors from 'cors'
import express from 'express'
import fetch from 'node-fetch'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = 3000

const API_KEY = process.env.OPENAI_API_KEY

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello, this is your Express server!')
})

app.post('/api/chat', async (req, res) => {
    try {
        console.log('Request Payload to OpenAI:', JSON.stringify(req.body));

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify(req.body),
        })

        const responseBody = await response.text();

        console.log('OpenAI Response Status:', response.status)
        console.log('OpenAI Response Body:', responseBody)

        const data = JSON.parse(responseBody)

        console.log('Response from OpenAI:', data)
        res.json(data)

    } catch (error) {
        console.error('Error from OpenAI:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.post('/api/images/generations', async (req, res) => {
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify(req.body),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()
        console.log('OpenAI API Response:', result);

        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}/aichat.html`)
})
