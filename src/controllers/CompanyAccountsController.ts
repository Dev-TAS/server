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
    
      return response.status(201).send(true);
  
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
    const password = filter.password as string || null;

    if ( logIn !== null && email === null && password !== null) {
      const returnAccount = await db('companyAccounts')
      .where('companyAccounts.logIn', '=', logIn);

      const account = returnAccount[0]

      if (account !== undefined && account.password === password) {

        return response.json([true, account.id])

      } else {

        return response.json(false);

      }

    } else if ( logIn === null && email !== null && password !== null) {
      const returnAccount = await db('companyAccounts')
      .where('companyAccounts.email', '=', email);

      const account = returnAccount[0]

      if (account !== undefined && account.password === password) {

        return response.json([true, account.id])

      } else {

        return response.json(false);

      }
    } else if ( logIn !== null && email === null && password === null ) {
      const returnAccount = await db('companyAccounts')
      .where('companyAccounts.logIn', '=', logIn)

      const account = returnAccount[0]

      if(account !== undefined) {
        return response.json(1)
      } else {
        return response.json(0)
      }
    } else if ( logIn === null && email !== null && password === null ) {
      const returnAccount = await db('companyAccounts')
      .where('companyAccounts.email', '=', email)

      const account = returnAccount[0]

      if(account !== undefined) {
        return response.json(1)
      } else {
        return response.json(0)
      }
    } else {
      return response.json(false)
    }
  }
};