import express, {Request, Response, NextFunction} from 'express';
import { router } from './routes';
import { AppError } from './utils/AppError';
import {ZodError} from 'zod';
import e from 'express';
const PORT = 3333;
const app = express();
app.use(express.json());

app.use(router);

app.use((error:any,request:Request,response:Response,_:NextFunction)=>{
    
    if(error instanceof AppError){ 
        return response.status(error.statusCode).json({ message: error.message})
    }

    if(error instanceof ZodError){
        return response.status(400).json({ message:"validation error", issues: error.format()})
    }
    return response.status(500).json({
        message: error.message
    })
})

app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`));

