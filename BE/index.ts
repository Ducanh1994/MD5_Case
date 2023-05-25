import express from 'express'
import {AppDataSource} from "./src/data-source";
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload';
import session from "express-session";
import cors from 'cors';
import {router} from './src/router/router';



const app = express()
AppDataSource.initialize().then(()=>{
    console.log('Connect database success!!!')
})

app.use(cors());
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 60000 }}));
app.use('', router);

app.listen(3001,() =>{
    console.log('Server is running at port 3001')
})