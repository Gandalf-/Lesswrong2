import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import schema from './schema.js';
import './fragments.js';
import './permissions.js';

const Sequences = createCollection({

  collectionName: 'Sequences',

  typeName: 'Sequence',

  schema,

  resolvers: getDefaultResolvers('Sequences'),

  mutations: getDefaultMutations('Sequences'),
});

export default Sequences;