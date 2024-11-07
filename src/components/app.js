import {picoapp} from 'picoapp';

import image from './image';
import newsletter from './newsletter';
import footerInstagramCarousel from './footerInstagramCarousel';
import cartCount from './cartCount';
import menuTrigger from './menuTrigger';
import menu from './menu';
import parallaxBackground from './parallaxBackground';
import productFormQuickAdd from './productFormQuickAdd';
import imageGridCarousel from './imageGridCarousel';
import pressCarousel from './pressCarousel';
import menuDrawer from './menuDrawer';
import cart from './cart';
import cartSubtotal from './cartSubtotal';
import productHeroImageCarousel from './productHeroImageCarousel';

const defaultState = {
	cart: {},

	// UI State
	activeMenu: null,
};

const components = {
	image,
	newsletter,
	footerInstagramCarousel,
	cartCount,
	menuTrigger,
	menu,
	parallaxBackground,
	productFormQuickAdd,
	imageGridCarousel,
	pressCarousel,
	menuDrawer,
	cart,
	cartSubtotal,
	productHeroImageCarousel,
};

export default function createApp(initialState) {
	return picoapp(components, {
		...defaultState,
		...initialState,
	});
}
