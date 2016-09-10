// import http dependency
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server);
var redis = require('redis')

//sys.argv
var argv = require('minimist')(process.argv.slice(2))
var redis_port =argv['redis_port']
var redis_host = argv['redis_host']
var subscribe_channel = argv['subscribe_channel']
var port = argv['port']

console.log('Creating a redis client');
var redisClient = redis.createClient(redis_port, redis_host);
console.log('Subscribe to redis channel %s', subscribe_channel)

//redis logic
redisClient.subscribe(subscribe_channel)
redisClient.on('message', function(channel, message){
    if(channel==subscribe_channel){
        console.log('message received % s', message)
        io.sockets.emit('data', message)
    }
})

// - setup webapp routing
app.use(express.static(__dirname + '/public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/smoothie', express.static(__dirname + '/node_modules/smoothie/'));


server.listen(port, function () {
    console.log("Server started at port %d.", port)
})

// - setup shutdown hooks
var shutdown_hook = function () {
    console.log('Quitting redis client');
    redisclient.quit();
    console.log('Shutting down app');
    process.exit();
};

process.on('SIGTERM', shutdown_hook);
process.on('SIGINT', shutdown_hook);
process.on('exit', shutdown_hook);
