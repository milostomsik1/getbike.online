import Users from '../users';
import Categories from '../categories';
import Subcategories from '../subcategories';
import Ads from '../ads';
import Ratings from '../ratings';
import Notifications from '../notifications';
import Messages from '../messages';
import Threads from '../threads';

Users()
.then(() => Categories())
.then(() => Subcategories())
.then(() => Ads())
.then(() => Ratings())
.then(() => Notifications())
.then(() => Messages())
.then(() => Threads())
.then(() => console.log('\nSuccessfully finished seeding all items.'))
.catch(err => console.log(err));
