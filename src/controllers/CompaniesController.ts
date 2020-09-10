import { Request, Response } from 'express'

import db from "../database/connection";

export default class CompaniesController {
  async create(request: Request, response: Response) {
    const {
      name,
      cnpj,
      email,
      phone,
      whatsapp,
      avatar,
      bio,
      account_id
    } = request.body;
  
    const trx = await db.transaction();
  
    try {
      await trx('companies').insert({
        name,
        cnpj,
        email,
        phone,
        whatsapp,
        avatar,
        bio,
        account_id
      })
    
      await trx.commit();
    
      return response.status(201).send();
  
    } catch(e) {
      await trx.rollback();
  
      console.log(e);
      return response.status(400).json({
        error: 'Unexpected error while creating new company' 
      });
    }
  };

  async index(request: Request, response: Response) {
    const filter = request.query;

    const account_id = filter.account_id as string;

    const company = await db('companies')
    .where('companies.account_id', '=', account_id);

    return response.send(company);
  }
};