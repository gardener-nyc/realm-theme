import {picoapp} from 'picoapp';

import image from './image';
import newsletter from './newsletter';
import footerInstagramCarousel from './footerInstagramCarousel';
import cartCount from './cartCount';
import menuTrigger from './menuTrigger';

let cart = {};

// Hydrate from HTML
try {
	cart = window.CART;
} catch (error) {
	console.log(error);
}

const state = {
	cart,

	// State
	activeMenu: null,
};

const components = {
	image,
	newsletter,
	footerInstagramCarousel,
	cartCount,
	menuTrigger,
};

const app = picoapp(components, state);

export default app;
