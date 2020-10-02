import { Request, Response } from 'express'

import db from "../database/connection";

export default class UsersController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      phone,
      whatsapp,
      state,
      city,
      avatar,
      account_id
    } = request.body;

    const trx = await db.transaction();

    try {
      await trx('users').insert({
      name,
      email,
      phone,
      whatsapp,
      state,
      city,
      avatar,
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
  }

  async index(request: Request, response: Response) {
    const filter = request.query;

    const account_id = filter.account_id as string;

    const user = await db('users')
    .where('users.account_id', '=', account_id);

    return response.send(user);
  }
};
