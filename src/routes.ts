import express from 'express'
import CompaniesController from './controllers/CompaniesController';
import CompanyAccountsController from './controllers/CompanyAccountsController';
import CompanyLocationsController from './controllers/CompanyLocationsController';
import CouponsController from './controllers/CouponsController';

import UserAccountsController from './controllers/UserAccountsController';
import UsersController from './controllers/UsersController';

const routes = express.Router();

const companyAccountsController = new CompanyAccountsController();
const companiesController = new CompaniesController();
const companyLocationsController = new CompanyLocationsController();

const userAccountsController = new UserAccountsController();
const usersController = new UsersController();

const couponsController = new CouponsController();

routes.post('/companyAccounts', companyAccountsController.create);
routes.get('/companyAccounts', companyAccountsController.index);

routes.post('/companies', companiesController.create);
routes.get('/companies', companiesController.index);
routes.put('/companies', companiesController.update);

routes.post('/companyLocations', companyLocationsController.create);
routes.get('/companyLocations', companyLocationsController.index);

/*-------------------------------------------------------------------------------*/

routes.post('/userAccounts', userAccountsController.create);
routes.get('/userAccounts', userAccountsController.index);

routes.post('/users', usersController.create);
routes.get('/users', usersController.index);
routes.put('/users', usersController.update);

/*-------------------------------------------------------------------------------*/

routes.post('/coupons', couponsController.create);
routes.get('/coupons', couponsController.index);

export default routes;