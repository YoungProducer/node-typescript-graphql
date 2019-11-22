import * as mongoose from 'mongoose';

// Import DataBaseController for database opening and closing
import { DataBaseController } from '../lib/utils/dataBaseController';

// Load models since we will not be instantiating our express server.
import UserController from '../lib/models/user';

beforeEach(done => {
  /*
    Define clearDB function that will loop through all
    the collections in our mongoose connection and drop them.
  */
    const clearDB = () => {
        for (let i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(() => {});
        }
        return done();
    };

  /*
    If the mongoose connection is closed,
    start it up using the test url and database name
    provided by the node runtime ENV
  */
    if (mongoose.connection.readyState === 0) {
        DataBaseController.connect('user').catch(error => {
            if (error) {
                throw error;
            }
            return clearDB();
        });
    } else {
        return clearDB();
    }
});

afterEach(done => {
    DataBaseController.disconnect();
    return done();
});

afterAll(done => {
    return done();
});
