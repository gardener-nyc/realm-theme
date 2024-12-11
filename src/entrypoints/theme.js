import createApp from '../components/app';
import captcha from '../components/captcha';
import prefetchAllLinks from '../components/prefetchAllLinks';

// Hydrate from HTML
let initialCart = {};

try {
	initialCart = window.CART;
} catch (error) {
	console.log(error);
}

// Start up app
const app = createApp({
	cart: initialCart,
});

app.mount();
window.app = app;

// Side effects
captcha();
prefetchAllLinks();

// Code credit
console.groupCollapsed('Site Credits');
console.log('Design by Malu Marzarotto https://malu.work');
console.log('Development by Gardener https://www.gardener.nyc');
console.groupEnd();
