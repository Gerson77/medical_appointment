import express from 'express'
import { userRouter } from './routes/user.routes';
const app = express()

app.use(express.json())
app.use(userRouter)


app.listen(3000, () => console.log('Sever is running...'));