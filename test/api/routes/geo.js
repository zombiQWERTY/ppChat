export default function testGEO(request) {
  describe('GEO add', () => {
    it('should re-add all GEO data from JSON', async () => {
      const res = await request
        .post('/api/geo')
        .expect(200);
      res.body.message.should.equal('GEO data was re-added.');
    });

    it('should re-add countries from JSON', async () => {
      const res = await request
        .post('/api/geo?type=country')
        .expect(200);
      res.body.message.should.equal('Countries was re-added.');
    });

    it('should re-add regions from JSON', async () => {
      const res = await request
        .post('/api/geo?type=region')
        .expect(200);
      res.body.message.should.equal('Regions was re-added.');
    });

    it('should re-add cities from JSON', async () => {
      const res = await request
        .post('/api/geo?type=city')
        .expect(200);
      res.body.message.should.equal('Cities was re-added.');
    });
  });

  describe('GEO show', () => {
    it('should show all countries', async () => {
      const res = await request
        .get('/api/geo/country')
        .expect(200);
    });

    it('should show one country', async () => {
      const res = await request
        .get('/api/geo/country?id=1')
        .expect(200);
    });

    it('should show all regions', async () => {
      const res = await request
        .get('/api/geo/region')
        .expect(200);
    });

    it('should show all regions by countryId', async () => {
      const res = await request
        .get('/api/geo/region?country=1')
        .expect(200);
    });

    it('should show one region by id', async () => {
      const res = await request
        .get('/api/geo/region?id=343')
        .expect(200);
    });

    it('should show regions with countries info', async () => {
      const res = await request
        .get('/api/geo/region?populate=country')
        .expect(200);
    });

    it('should show all cities', async () => {
      await request
        .get('/api/geo/city')
        .expect(200);
    });

    it('should show city by id', async () => {
      await request
        .get('/api/geo/city?id=2537')
        .expect(200);
    });


    it('should show all cities in specified country', async () => {
      await request
        .get('/api/geo/city?country=1')
        .expect(200);
    });

    it('should show all cities in specified region', async () => {
      await request
        .get('/api/geo/city?region=343')
        .expect(200);
    });

    it('should show all cities with countries info', async () => {
      await request
        .get('/api/geo/city?populate=country')
        .expect(200);
    });

    it('should show all cities with regions info', async () => {
      await request
        .get('/api/geo/city?populate=region')
        .expect(200);
    });

    it('should show all cities with countries and regions info', async () => {
      await request
        .get('/api/geo/city?populate=country region')
        .expect(200);
    });

    it('should show all cities with countries, regions and regions.country info', async () => {
      await request
        .get('/api/geo/city?populate=country region region.country')
        .expect(200);
    });

    it('should show all cities with countries and regions.country info', async () => {
      await request
        .get('/api/geo/city?populate=country region.country')
        .expect(200);
    });

    it('should show all cities with regions and regions.country info', async () => {
      await request
        .get('/api/geo/city?populate=region region.country')
        .expect(200);
    });
  });
}
