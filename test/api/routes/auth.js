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
          avatar:     require('mongoose').Types.ObjectId(),
          name:       Faker.name.firstName(),
          surname:    Faker.name.lastName(),
          birthdate:  Faker.date.past(),
          country:    1,
          region:     261,
          city:       1367,
          login:      Faker.internet.userName(),
          email:      email,
          password:   password
        })
        .expect(200);

      expect(res.body.token).to.exist;
      TOKEN = res.body.token;
      ID    = res.body.user._id;
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

  describe('Edit user', () => {
    it('should edit user account name', async () => {
      const res = await request
        .patch('/api/user/' + ID)
        .set({ Authorization: TOKEN })
        .send({ name: Faker.name.firstName() })
        .expect(200);
      // console.log(res.body);
    });
  });

  describe('Chat', () => {
    it('should create new channel', async () => {
      const res = await request
        .post('/api/chat/channel')
        .set({ Authorization: TOKEN })
        .field('title', Faker.name.title())
        .field('description', Faker.lorem.sentence())
        .field('open', '' + Faker.random.boolean())
        .attach('avatar', `${__dirname}/../../assets/440x320.png`)
        .expect(200);
      // console.log(res);
    });

    it('should not create new channel', async () => {
      const res = await request
        .post('/api/chat/channel')
        .set({ Authorization: TOKEN })
        .field('title', Faker.name.title())
        .field('description', Faker.lorem.sentence())
        .field('open', '' + Faker.random.boolean())
        .attach('avatar', `${__dirname}/../../assets/200x100.png`)
        .expect(400);
      // console.log(res);
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
