import chai  from 'chai';
import Faker from 'faker';

const expect = chai.expect;

Faker.locale = 'ru';

export default function testUser(request) {
  const email    = Faker.internet.email();
  const password = Faker.internet.password();

  let TOKEN = null;
  let ID    = null;

  describe('Registration', () => {
    it('should register fake user', async () => {
      const res = await request
        .post('/api/auth/register')
        .send({
          entityName: Faker.company.companyName(),
          INN:        Faker.random.number({
            min: 100000000000,
            max: 999999999999
          }),
          BIN:        Faker.random.number({
            min: 1000000000000,
            max: 9999999999999
          }),
          PPC:        Faker.random.number({
            min: 100000000,
            max: 999999999
          }),
          email:      email,
          password:   password
        })
        .expect(200);

      expect(res.body.token).to.exist;
      TOKEN = res.body.token;
    });

    it('should finish fake user registration', async () => {
      const res = await request
        .patch('/api/auth/register/finish')
        .set({ Authorization: TOKEN })
        .send({
          physicalAddress:    Faker.address.streetAddress(),
          entityAddress:      Faker.address.streetAddress(),
          CEOName:            Faker.name.findName(),
          base:               Faker.lorem.sentence(),
          fullName:           Faker.name.findName(),
          personalPhone:      Faker.phone.phoneNumber().replace(/[^a-zA-Z0-9]/g, ''),
          officePhone:        Faker.phone.phoneNumber().replace(/[^a-zA-Z0-9]/g, ''),
          INNDoc:             Faker.system.fileName(),
          statuteDoc:         Faker.system.fileName(),
          extractDoc:         Faker.system.fileName(),
          appointingOrderDoc: Faker.system.fileName(),
          nearestCity:        2537
        })
        .expect(200);

      ID = res.body.companyInfo._id;
    });
  });

  describe('Logging in', () => {
    it('should login as fake user', async () => {
      const res = await request
        .post('/api/auth/login/')
        .send({ email, password })
        .expect(200);
      // console.log(res.body);

      TOKEN = res.body.token;
    });
  });

  describe('Edit company', () => {
    it('should edit company account full name', async () => {
      const res = await request
        .patch('/api/company/' + ID)
        .set({ Authorization: TOKEN })
        .send({ fullName: Faker.name.findName() })
        .expect(200);
      // console.log(res.body);
    });
  });

  describe('Rating', () => {
    it('shouldnt star itself', async () => {
      const res = await request
        .patch('/api/company/' + ID + '/star')
        .set({ Authorization: TOKEN })
        .expect(403);
      // console.log(res.body);
    });

    it('shouldnt unstar itself', async () => {
      const res = await request
        .patch('/api/company/' + ID + '/unstar')
        .set({ Authorization: TOKEN })
        .expect(403);
      // console.log(res.body);
    });
  });

  describe('Services', () => {
    let SERVICE_ID;

    it('should add service', async () => {
      const res = await request
        .put('/api/service')
        .set({ Authorization: TOKEN })
        .send({
          serviceName: Faker.company.companyName(),
          title: Faker.lorem.sentence(),
          description: Faker.lorem.paragraph(),
          address: Faker.address.streetAddress(),
          phone: Faker.random.number(),
          email: Faker.internet.email(),
          nearestCity: 2537,
          coords: {
            lat: Faker.address.latitude(),
            lng: Faker.address.longitude()
          },
          logo: Faker.image.business(),
        })
        .expect(200);

      SERVICE_ID = res.body.service._id;
    });

    it('should remove service', async () => {
      const res = await request
        .delete('/api/service/' + SERVICE_ID)
        .set({ Authorization: TOKEN })
        .expect(200);
      // console.log(res.body);
    });

    it('should edit service', async () => {
      const res = await request
        .patch('/api/service/' + SERVICE_ID)
        .set({ Authorization: TOKEN })
        .send({
          serviceName: Faker.company.companyName()
        })
        .expect(200);
      // console.log(res.body);
    });
  });

  describe('Logging out', () => {
    it('should log out current user', async () => {
      const res = await request
        .delete('/api/auth/logout')
        .set({ Authorization: TOKEN })
        .expect(200);

      TOKEN = null;
    });
  });
}
