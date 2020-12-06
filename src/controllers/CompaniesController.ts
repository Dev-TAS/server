import { Request, Response } from 'express'

import db from "../database/connection";

export default class CompaniesController {
  async create(request: Request, response: Response) {
    const {
      name,
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
    const id = filter.id as string;

    console.log(id)
    
    if(account_id !== undefined && id === undefined) {
      const company = await db('companies')
      .where('companies.account_id', '=', account_id);
      
      return response.send(company);

    } else if (account_id === undefined && id !== undefined) {
      const company = await db('companies')
      .where('companies.id', '=', id);
      
      return response.send(company);
    }
  }

  async update(request: Request, response: Response) {
    const {
      name,
      email,
      phone,
      whatsapp,
      avatar,
      bio,
      account_id
    } = request.body;

    const trx = await db.transaction();

    try {
      await trx('companies').where('account_id', '=', account_id)
      .update({
        name,
        email,
        phone,
        whatsapp,
        avatar,
        bio,
      })

      await trx.commit();

      return response.status(201).send('Informações salvas com sucesso!');
    } catch {
      await trx.rollback();

      return response.status(400).json({
        error: 'Erro ao atualizar informações'
      })
    }
  }
};