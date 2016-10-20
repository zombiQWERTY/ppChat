import chai  from 'chai';
import Faker from 'faker';

const expect = chai.expect;

Faker.locale = 'ru';

export default function testAdmin(request) {
  const email    = Faker.internet.email();
  const password = Faker.internet.password();

  const companyEmail    = Faker.internet.email();
  const companyPassword = Faker.internet.password();

  let TOKEN     = null;
  let ID        = null;
  let IDCompany = null;

  describe('Registration', () => {
    it('should register fake admin', async () => {
      const res = await request
        .post('/api/auth/admin')
        .send({
          companyName:   Faker.company.companyName(),
          email:         email,
          personalPhone: Faker.phone.phoneNumber().replace(/[^a-zA-Z0-9]/g, ''),
          officePhone:   Faker.phone.phoneNumber().replace(/[^a-zA-Z0-9]/g, ''),
          curatorName:   Faker.name.findName(),
          cities:        `${Faker.random.number()}, ${Faker.random.number()}`,
          password:      password
        })
        .expect(200);

      ID = res.body.adminInfo._id;
    });
  });

  describe('Logging in', () => {
    it('should login as fake admin', async () => {
      const res = await request
        .post('/api/auth/admin/login')
        .send({ email, password })
        .expect(200);
      // console.log(res.body);

      TOKEN = res.body.token;
    });
  });

  describe('Edit admin', () => {
    it('should edit admin account curator name', async () => {
      const res = await request
        .patch('/api/admin/' + ID)
        .set({ Authorization: TOKEN })
        .send({ curatorName: Faker.name.findName() })
        .expect(200);
      // console.log(res.body);
    });
  });

  describe('Register company', () => {
    it('should register full fake company', async () => {
      const res = await request
        .post('/api/admin/company')
        .set({ Authorization: TOKEN })
        .send({
          entityName:         Faker.company.companyName(),
          INN:                Faker.random.number({
            min: 100000000000,
            max: 999999999999
          }),
          BIN:                Faker.random.number({
            min: 1000000000000,
            max: 9999999999999
          }),
          PPC:                Faker.random.number({
            min: 100000000,
            max: 999999999
          }),
          email:              companyEmail,
          password:           companyPassword,
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
      // console.log(res.body);

      IDCompany = res.body.companyInfo._id;
    });
  });

  describe('Edit company', () => {
    it('should edit company account full name', async () => {
      const res = await request
        .patch('/api/admin/company/' + IDCompany)
        .set({ Authorization: TOKEN })
        .send({ fullName: Faker.name.findName() })
        .expect(200);
      // console.log(res.body);
    });
  });

  describe('Toggle confirm company', () => {
    it('should confirm company account', async () => {
      const res = await request
        .patch('/api/admin/company/' + IDCompany + '/confirm/true')
        .set({ Authorization: TOKEN })
        .expect(200);
      // console.log(res.body);
    });

    it('should unconfirm company account', async () => {
      const res = await request
        .patch('/api/admin/company/' + IDCompany + '/confirm/false')
        .set({ Authorization: TOKEN })
        .expect(200);
      // console.log(res.body);
    });

    it('shouldn\'t unconfirm company account', async () => {
      const res = await request
        .patch('/api/admin/company/' + IDCompany + '/confirm/ffalse')
        .set({ Authorization: TOKEN })
        .expect(400);
      // console.log(res.body);
    });
  });

  describe('Toggle archieve company', () => {
    it('should archieve company account', async () => {
      const res = await request
        .patch('/api/admin/company/' + IDCompany + '/archieve/true')
        .set({ Authorization: TOKEN })
        .expect(200);
      // console.log(res.body);
    });

    it('should disarchieve company account', async () => {
      const res = await request
        .patch('/api/admin/company/' + IDCompany + '/archieve/false')
        .set({ Authorization: TOKEN })
        .expect(200);
      // console.log(res.body);
    });

    it('shouldn\'t disarchieve company account', async () => {
      const res = await request
        .patch('/api/admin/company/' + IDCompany + '/archieve/ffalse')
        .set({ Authorization: TOKEN })
        .expect(400);
      // console.log(res.body);
    });
  });

  describe('Toggle touch company', () => {
    it('should archieve company account', async () => {
      const res = await request
        .patch('/api/admin/company/' + IDCompany + '/touch/true')
        .set({ Authorization: TOKEN })
        .expect(200);
      // console.log(res.body);
    });

    it('should untouch company account', async () => {
      const res = await request
        .patch('/api/admin/company/' + IDCompany + '/touch/false')
        .set({ Authorization: TOKEN })
        .expect(200);
      // console.log(res.body);
    });

    it('shouldn\'t untouch company account', async () => {
      const res = await request
        .patch('/api/admin/company/' + IDCompany + '/touch/ffalse')
        .set({ Authorization: TOKEN })
        .expect(400);
      // console.log(res.body);
    });
  });

  describe('Logging out', () => {
    it('should log out current admin', async () => {
      const res = await request
        .delete('/api/auth/logout')
        .set({ Authorization: TOKEN })
        .expect(200);

      TOKEN = null;
    });
  });
}
