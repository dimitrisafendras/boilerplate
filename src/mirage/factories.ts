import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

// Define factories for generating mock data
export const factories = {
  user: Factory.extend({
    id() {
      return faker.string.uuid();
    },
    name() {
      return faker.person.fullName();
    },
    email() {
      return faker.internet.email();
    },
    role() {
      return faker.helpers.arrayElement(['admin', 'user']);
    },
    createdAt() {
      return faker.date.past().toISOString();
    },
  }),
};
