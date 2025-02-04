import express from 'express'
import router from './routes/routes';
import cors from 'cors'

const app = express();

app.use(cors());
app.use('/', router);

app.listen(4000, () => console.log('Contacts backend app listening on port 4000'));