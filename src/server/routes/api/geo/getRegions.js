import { setSuccess, setError } from '../../../utils';
import Region                   from '../../../models/GEO/Region';

/**
 * @api {get} /api/geo/region Get regions
 * @apiName GetRegions
 * @apiGroup GEO
 *
 * @apiParam {Integer} [id] Region id
 * @apiParam {String="country"} [populate] Populate result with
 * @apiParam {Integer} [country] Get regions by country id
 *
 * @apiDescription If id is provided then country param will be an Object
 *
 * @apiSuccess {String} _id Region id
 * @apiSuccess {String} country Country id
 * @apiSuccess {String} regionName Region name
 * @apiSuccess {String} slug Region name slug
 *
 * @apiVersion 1.0.0
 */

async function getRegions(ctx, next) {
  const populateTypes = ['', 'country'];
  let populate = populateTypes[0];

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

      const region = await Region.find({ _id: query.id }).populate(populate).exec();

      if (!region.length) {
        ctx.status = 204;
        ctx.body = {
          message: 'Region not found'
        };
        return;
      }

      await next();
      return setSuccess(ctx, region[0]);
    }
    if (query.country) {
      if (!Number.isInteger(parseInt(query.country))) { await next(); ctx.status = 400; return; }

      const regions = await Region.find({ country: query.country }).populate(populate).exec();

      if (!regions.length) {
        ctx.status = 204;
        ctx.body = {
          message: 'Regions not found'
        };
        return;
      }

      await next();
      return setSuccess(ctx, regions);
    }
    const regions = await Region.find().populate(populate).exec();

    if (!regions.length) {
      ctx.status = 204;
      ctx.body = {
        message: 'Regions not found'
      };
      return;
    }

    await next();
    setSuccess(ctx, regions);
  } catch (error) {
    setError(ctx, error);
  }
}

export default getRegions;
