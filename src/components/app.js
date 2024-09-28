import {picoapp} from 'picoapp';

import image from './image';
import newsletter from './newsletter';

const state = {};

const components = {image, newsletter};

export default picoapp(components, state);
