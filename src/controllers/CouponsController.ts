import { Request, Response } from 'express'

import db from '../database/connection'

export default class CouponsController {
  async create(request: Request, response: Response) {
    const {
      code,
      points,
      value,
      status,
      date,
      account_id
    } = request.body;

    console.log(request.body)

    const trx = await db.transaction();
    try {
      await trx('coupons').insert({
        code,
        points,
        value,
        status,
        date,
        account_id
      });
      await trx.commit();

      return response.status(201).send();

    } catch(e) {
      await trx.rollback();
  
      return response.status(400).json({
        error: e
      });
    }
  }

  async index(request: Request, response: Response) {
    const filter = request.query;

    const account_id = filter.account_id as string;

    const coupons = await db('coupons')
    .where('coupons.account_id', '=', account_id);

    return response.send(coupons);
  }
}