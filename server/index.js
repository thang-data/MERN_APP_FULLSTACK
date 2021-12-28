require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouer = require('./routes/post')

const ConnectDB = async () => {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern.nu1u3.mongodb.net/mern-app?retryWrites=true&w=majority`, {
/*             useCreateIndex: true,
 */         useNewUrlParser: true,
            useUnifiedTopology: true
/*             useFindAndModify:false
 */        })
        console.log('Database connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

ConnectDB();


const app = express();
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouer)

const PORT = 5000;

app.listen(PORT,() => console.log(`Server started on post ${PORT}`))
