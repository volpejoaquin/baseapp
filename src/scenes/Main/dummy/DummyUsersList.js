import faker from 'faker';
import lodash from 'lodash';

export default DUMMY_USERS = [
];

lodash.times(40, (index) => {
  DUMMY_USERS.push({
    id: '' + (index + 1),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: faker.name.title(),
    avatar_url: faker.image.avatar()
  })
});