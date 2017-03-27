import schema from './schema.js';
import mutations from './mutations.js';
import resolvers from './resolvers.js';
// TODO: is the following comment true in our case?
import { createCollection } from 'meteor/vulcan:lib'; // import from vulcan:lib because vulcan:core isn't loaded yet

/**
 * @summary Telescope Notifications namespace
 * @namespace Notifications
 */
const Notifications = createCollection({

  // collection: Meteor.notifications,

  collectionName: 'notifications',

  typeName: 'Notification',

  schema,

  resolvers,

  mutations,

});

export default Notifications;