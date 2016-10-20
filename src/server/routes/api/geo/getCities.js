import { setSuccess, setError } from '../../../utils';
import City                     from '../../../models/GEO/City';

/**
 * @api {get} /api/geo/city Get cities
 * @apiName GetCities
 * @apiGroup GEO
 *
 * @apiParam {Integer} [id] City id
 * @apiParam {String="country", "region", "country region", "country region region.country",
 * "country region.country", "region region.country"} [populate] Populate
 * result with
 * @apiParam {Integer} [country] Get cities by country id
 * @apiParam {Integer} [region] Get cities by region id
 *
 * @apiDescription If id is provided then country (and/or region) param will be an Object
 *
 * @apiSuccess {String} _id City id
 * @apiSuccess {String} country Country id
 * @apiSuccess {String} region Region id
 * @apiSuccess {String} cityName City name
 * @apiSuccess {String} slug City name slug
 * @apiSuccess {Object} coords City coords
 *
 * @apiVersion 1.0.0
 */

async function getCities(ctx, next) {
  const populateTypes = ['', 'country', 'region', 'country region', 'country region region.country',
    'country region.country', 'region region.country'];
  let populate = populateTypes[0];

  const getData = async (query = {}) => await City.find(query).deepPopulate(populate).exec();

  try {
    const query = ctx.query;
    if (query.populate) {
      if (query.populate === populateTypes[0]) {
        populate = populateTypes[0];
      } else {
        populateTypes.forEach(type => {
          if (query.populate === type) { populate = type; }
        });
      }
    }
    if (query.id) {
      if (!Number.isInteger(parseInt(query.id))) { await next(); ctx.status = 400; return; }

      const city = await getData({ _id: query.id });

      if (!city.length) {
        ctx.status = 204;
        ctx.body = {
          message: 'City not found'
        };
        return;
      }

      await next();
      return setSuccess(ctx, city[0]);
    }
    if (query.country) {
      if (!Number.isInteger(parseInt(query.country))) { await next(); ctx.status = 400; return; }

      const cities = await getData({ country: query.country });

      if (!cities.length) {
        ctx.status = 204;
        ctx.body = {
          message: 'Cities not found'
        };
        return;
      }

      await next();
      return setSuccess(ctx, cities);
    }
    if (query.region) {
      if (!Number.isInteger(parseInt(query.region))) { await next(); ctx.status = 400; return; }

      const cities = await getData({ region: query.region });

      if (!cities.length) {
        ctx.status = 204;
        ctx.body = {
          message: 'Cities not found'
        };
        return;
      }

      await next();
      return setSuccess(ctx, cities);
    }
    const cities = await getData();

    if (!cities.length) {
      ctx.status = 204;
      ctx.body = {
        message: 'Cities not found'
      };
      return;
    }

    await next();
    setSuccess(ctx, cities);
  } catch (error) {
    setError(ctx, error);
  }
}

export default getCities;
