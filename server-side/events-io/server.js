import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()

const io = new Server(httpServer, {
})

io.on("connection", (socket) => {
	
	console.log(socket.id)
	socket.on('type-of-event', arg => {
		console.log(arg)
	})
})

httpServer.listen(3033)