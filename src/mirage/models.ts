import { Model, Registry } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import { User } from '@/common/types/user';

// Define Mirage models
export interface AppRegistry extends Registry {
  user: User;
}

// Define model for User
export const models: Record<string, ModelDefinition> = {
  user: Model.extend({}),
};
