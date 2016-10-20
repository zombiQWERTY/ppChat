import { setSuccess, setError } from '../../../utils';
import slug                     from 'limax';
import Country                  from '../../../models/GEO/Country';
import Region                   from '../../../models/GEO/Region';
import City                     from '../../../models/GEO/City';

/**
 * @api {post} /api/geo/ Re-add all GEO-data
 * @apiName ReAddGeoData
 * @apiGroup GEO
 *
 * @apiParam {String="country", "region", "city"} [type] Type of GEO-data which need to re-add.
 *
 * @apiSuccess {String} message Message of adding status.
 *
 * @apiVersion 1.0.0
 */

function addSlug(items, name) {
  items.forEach((item) => item.slug = slug(item[name]));
  return items;
}

async function reAddCountries() {
  const CountriesData = require('../../../../../data/GEO/Countries');

  await Country.remove();
  await Country.create(addSlug(CountriesData, 'countryName'));
}

async function reAddRegions() {
  const RegionsData = require('../../../../../data/GEO/Regions');

  await Region.remove();
  await Region.create(addSlug(RegionsData, 'regionName'));
}

async function reAddCities() {
  const CitiesData = require('../../../../../data/GEO/Cities');

  await City.remove();
  await City.create(addSlug(CitiesData, 'cityName'));
}

async function reAddGeo(ctx, next) {
  try {
    const query = ctx.query;

    if (query.type) {
      if (query.type === 'country') {
        reAddCountries();
        await next();
        return setSuccess(ctx, { message: 'Countries was re-added.' });
      }
      if (query.type === 'region') {
        reAddRegions();
        await next();
        return setSuccess(ctx, { message: 'Regions was re-added.' });
      }
      if (query.type === 'city') {
        reAddCities();
        await next();
        return setSuccess(ctx, { message: 'Cities was re-added.' });
      }
    }

    reAddCountries();
    reAddRegions();
    reAddCities();

    await next();
    setSuccess(ctx, { message: 'GEO data was re-added.' });
  } catch (error) {
    setError(ctx, error);
  }
}

export default reAddGeo;
