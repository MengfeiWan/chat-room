var app = require('http').createServer()
var io = require("socket.io")(app)
var PORT = 3000
var clientCount = 0
app.listen(PORT)
io.on("connection", function (socket) {
    clientCount++
    socket.nickname = 'user' + clientCount
    //io.emit是触发广播的一个api，他可以将消息广播给所有用户，这就实现了群聊的功能
    io.emit("enter", socket.nickname + " come in")
  
    socket.on("message", function (str) {
      io.emit("message", socket.nickname + " says:" + str)
    })
    socket.on("disconnect", function () {
      io.emit("leave", socket.nickname + " left")
    })
  })
