let express = require('express');
const redis = require('redis');
const redisClient = redis.createClient({
    host: 'localhost',
    port: 2002,
  });
redisClient.connect();
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

let app = express();


app.get('/',async(req,res)=>{
    // set data
    await redisClient.set('key123',"facing such a situation");
    // get data
    let data = await redisClient.get("key123");
    res.status(200).json({
        message:"successfull ",
        data: data,
    })
})
app.listen(2002,()=>{
    console.log("server is running");
})