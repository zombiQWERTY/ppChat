import getCountries from './geo/getCountries';
import getRegions   from './geo/getRegions';
import getCities    from './geo/getCities';
import reAddGeo     from './geo/reAddGeo';

export default (router) => {
  router.get('/geo/country/', getCountries);
  router.get('/geo/region/', getRegions);
  router.get('/geo/city', getCities);
  router.post('/geo/', reAddGeo); // Temporary
};
