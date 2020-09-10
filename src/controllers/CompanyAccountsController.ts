import { Request, Response } from 'express'

import db from "../database/connection";

export default class CompaniesController {
  async create(request: Request, response: Response) {
    const {
     logIn,
     email,
     password
    } = request.body;
  
    const trx = await db.transaction();
  
    try {
      await trx('companyAccounts').insert({
        logIn,
        email,
        password
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

    const logIn = filter.logIn as string || null;
    const email = filter.email as string || null;
    const password = filter.password as string;

    if ( logIn !== null && email === null ) {
      const returnAccount = await db('companyAccounts')
      .where('companyAccounts.logIn', '=', logIn);

      const account = returnAccount[0]

      if (account !== undefined && account.password === password) {

        return response.json([true, account.id])

      } else {

        return response.json(false);

      }
    }
  }
};