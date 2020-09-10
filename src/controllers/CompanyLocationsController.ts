import { Request, Response, response } from 'express'

import db from "../database/connection";

export default class LocalsController {
  async create(request: Request, response: Response) {
    const {
      phone,
      whatsapp,
      serviceType,
      state,
      city,
      neighborhood,
      localNumber,
      company_id,
      company_name,
      latitude,
      longitude
    } = request.body;


    const trx = await db.transaction();

    try {
      await trx('companyLocations').insert({
        phone,
        whatsapp,
        serviceType,
        state,
        city,
        neighborhood,
        localNumber,
        company_id,
        company_name,
        latitude,
        longitude
      })

      await trx.commit();

      return response.status(201).send();

    } catch(e) {
      await trx.rollback();

      console.log(e);
      return response.status(400).json({
        error: 'Unexpected error while creating new Location'
      })
    }
  }

  async index(request: Request, response: Response) {
    const filter = request.query;

    const state = filter.state as string || null;
    const city = filter.city as string || null;

    if ( state !== null && city !== null) {
      const locations = await db('companyLocations')
      .where('companyLocations.state', '=', state)
      .andWhere('companyLocations.city', '=', city);

      return response.send(locations);
    }

    else if (state !== null && city === null) {
      const locations = await db('companyLocations')
      .where('companyLocations.state', '=', state);

      return response.send(locations);
    }

    else if (state === null) {
      return response.send(false);
    }
  }
}

