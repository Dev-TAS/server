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
      street,
      localNumber,
      company_id,
      latitude,
      longitude,
      title
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
        street,
        localNumber,
        company_id,
        latitude,
        longitude,
        title
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
    const company_id = filter.company_id as string || null;

    if ( state !== null && city !== null && company_id === null) {
      const locations = await db('companyLocations')
      .where('companyLocations.state', 'LIKE', state + '%')
      .andWhere('companyLocations.city', 'LIKE', city + '%');

      return response.send(locations);
    }

    else if (state !== null && city === null && company_id === null) {
      const locations = await db('companyLocations')
      .where('companyLocations.state', 'LIKE', state + '%');

      return response.send(locations);
    }

    else if (state === null && city === null && company_id !== null) {
      const locations = await db('companyLocations')
      .where('companyLocations.company_id', '=', company_id);

      return response.send(locations);

    } else if (state === null && city === null && company_id === null) {
      return response.send(false);
    }
  }
}

