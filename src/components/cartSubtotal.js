import {get} from 'lodash';
import {component} from 'picoapp';
import centsToPriceNoTrailingZeros from '../utils/centsToPriceNoTrailingZeros';

export default component((node, ctx) => {
	ctx.on('cart:update', state => {
		const newSubtotal = get(state, 'cart.items_subtotal_price', 0);
		node.innerHTML = centsToPriceNoTrailingZeros(newSubtotal);
	});

	return () => {};
});
