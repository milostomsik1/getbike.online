'use strict';
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/getbike');

// -- TODO: ADD SEEDER

console.log('Seed successfully completed. Disconnecting MongoDB.')
mongoose.disconnect();