import express from 'express'

export const app = express()
app.use(express.json())

const items = [{
  id: 1,
  content: 'Item 1'
}]

// EJERCICO 6 aquí

export const server = app.listen(3000)
