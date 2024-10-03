import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import {z} from "zod";
/*
index. - GET para listar vários registros.
create. - POST para criar um registro.
show. - GET para exibir um registro.
update. - PUT para atualizar um registro.
delete. - DELETE para deletar um registro.
*/ 

export class ProductsRouter{
    index(request: Request, response: Response){
        const {page, limit} = request.query;
        if(!page){
            throw new AppError("Página é obrigatória");
        }

        response.send(`Pagina ${page} de ${limit}`);  
    }

    create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z
            .string({required_error:"Nome é obrigatório"})
            .trim()
            .min(3, "Nome deve ter pelo menos 3 caracteres"),

            price: z.number({required_error: "Preço é obrigatório"}).nonnegative("Preço deve ser maior que zero"),
        })

        const {name, price} = bodySchema.parse(request.body);
        
  /*
        if(!name){
            throw new AppError("Nome é obrigatório");
        }
        if(name.trim().length < 3){
            throw new AppError("Nome deve ter pelo menos 3 caracteres");
        }

        if(!price){
            throw new AppError("Preço é obrigatório");
        }

        if(price <= 0){
            throw new AppError("Preço deve ser maior que zero");
        }
            */

        response.status(201).json({
            name,
            price,
            user_id: request.user_id
        });
    }

}