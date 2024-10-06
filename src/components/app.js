import {picoapp} from 'picoapp';

import image from './image';
import newsletter from './newsletter';
import footerInstagramCarousel from './footerInstagramCarousel';

const state = {};

const components = {image, newsletter, footerInstagramCarousel};

export default picoapp(components, state);
