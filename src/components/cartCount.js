import {get} from 'lodash';
import {component} from 'picoapp';

export default component((node, ctx) => {
	ctx.on('cart:update', state => {
		const newCount = get(state, 'cart.item_count', 0);
		node.innerHTML = newCount;
	});

	return () => {};
});
