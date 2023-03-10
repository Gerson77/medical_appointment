import { app } from './app'
const port = process.env.PORT || 3001
import 'dotenv/config'

app.listen(port, () => console.log('Sever is running on PORT 3000'));
