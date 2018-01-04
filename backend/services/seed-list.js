// -- Import Seeder
import seed from './seeder';
// -- Import Factories
import User from './user';
import Ad from './ad';

// -- Data Seeding
seed(() => User(null)).then(users =>
seed(() => Ad(users))).then(ads =>
{}).catch(err => console.log(err));
