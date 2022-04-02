require('dotenv-defaults').config()

import {GraphQLServer, PubSub} from 'graphql-yoga'
const pubsub = new PubSub()

import Mutation from './resolvers/Mutation'

import Query from './resolvers/Query'

import Subscription from './resolvers/Subscription'

import Message from './models/message'
  
//const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
//const WebSocket = require('ws')



const app = express()
//const server = http.createServer(app)
//const wss = new WebSocket.Server({ server })

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')
	

  /*wss.on('connection', ws => {
    const sendData = (data) => {
      ws.send(JSON.stringify(data))
    }

    const sendStatus = (s) => {
      sendData(['status', s])
    }

    Message.find()
      .limit(100)
      .sort({ _id: 1 })
      .exec((err, res) => {
        if (err) throw err

        // initialize app with existing messages
        sendData(['init', res])
      })

    ws.onmessage = (message) => {
      const { data } = message
	  
      const [task, payload] = JSON.parse(data)

      switch (task) {
        case 'input': {
          // TODO
			Message.create(payload, () => {
            sendData(['output', [payload]])

            sendStatus({
              type: 'success',
              msg: 'Message sent out successfully.'
            })
          })
			
          break
        }
        case 'clear': {
          Message.deleteMany({}, () => {
            sendData(['cleared'])

            sendStatus({
              type: 'info',
              msg: 'Message cache cleared.'
            })
          })

          break
        }
        default:
          break
      }
    }
  })*/


const server_graph = new GraphQLServer({
	typeDefs: './server/schema.graphql',
	resolvers:{
		Query,
		Mutation,
		Subscription
	},
	context:{
		pubsub
	}
})

  const PORT = process.env.port || 4000
  //const PORT2 = process.env.port || 5000

  /*server.listen(PORT2, () => {
    console.log(`Listening on http://localhost:${PORT2}`)
  })*/
	server_graph.start(PORT, () => {
	console.log(`GraphQL is on http://localhost:${PORT}`)
})
})
 
