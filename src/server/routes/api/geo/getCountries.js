import { setSuccess, setError } from '../../../utils';
import Country                  from '../../../models/GEO/Country';

/**
 * @api {get} /api/geo/country Get countries
 * @apiName GetCountries
 * @apiGroup GEO
 *
 * @apiParam {Integer} [id] Country id
 *
 * @apiSuccess {String} _id Country id
 * @apiSuccess {String} countryName Country name
 * @apiSuccess {String} slug Country name slug
 *
 * @apiVersion 1.0.0
 */

async function getCountries(ctx, next) {
  try {
    const query = ctx.query;
    if (query.id) {
      if (!Number.isInteger(parseInt(query.id))) { await next(); ctx.status = 400; return; }

      const country = await Country.find({ _id: query.id });

      if (!country.length) {
        ctx.status = 204;
        ctx.body = {
          message: 'Country not found'
        };
        return;
      }
      await next();
      return setSuccess(ctx, country[0]);
    }

    const countries = await Country.find();

    if (!countries.length) {
      ctx.status = 204;
      ctx.body = {
        message: 'Countries not found'
      };
      return;
    }

    await next();
    setSuccess(ctx, countries);
  } catch (error) {
    setError(ctx, error);
  }
}

export default getCountries;
