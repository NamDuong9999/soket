

// https://www.youtube.com/watch?v=grE8spf9bLU

var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangChat = []

// socket.adapter.rooms Show danh sach room dang co
io.on("connection", function (socket) {
  console.log("Co nguoi ket noi " + socket.id);

 
  socket.on("tao-room", function (data) {
    socket.join(data);
    socket.Phong = data;
console.log(data);
    socket.broadcast.emit('login', data);


    var mang = [];
    for (r in socket.adapter.rooms) {
      mang.push(r);
    }
    io.sockets.emit("server-send-rooms", mang);
    socket.emit("server-send-room-socket", data);

  });

  socket.on("event-name", function (data) {
    io.sockets.in(socket.Phong).emit("server-chat", data);
  });


  //  _______________________________________________________
  socket.on("name", (data) => {
    
    console.log(data);
  })


  // disconnect event
  socket.on('disconnect',() =>{console.log("client disconnect : " + socket.id)})

});

app.get("/", function (req, res) {
  res.render("trangchu");
});
