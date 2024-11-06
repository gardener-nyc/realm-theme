import {component} from 'picoapp';
import {addItemsToCart} from '../api/cart';

export default component((node, ctx) => {
	const productIdInput = node.querySelector('input[name="id"]');
	const quantityInput = node.querySelector('input[name="quantity"]');
	const submitButton = node.querySelector('button[type="submit"]');

	const productId = productIdInput ? Number(productIdInput.value) : null;
	const quantity = quantityInput ? Number(quantityInput.value) : 1;

	const onSubmit = async event => {
		event.preventDefault();

		if (!productId) throw new Error('No product ID is set');

		if (submitButton) {
			submitButton.disabled = true;
			submitButton.classList.add('loading');
		}

		try {
			const cart = await addItemsToCart([
				{
					id: productId,
					quantity,
				},
			]);

			ctx.emit('cart:update', {cart});
		} catch (error) {
			console.log(error);
			return;
		}

		if (submitButton) {
			submitButton.disabled = false;
			submitButton.classList.remove('loading');
		}

		ctx.emit('menu:toggle', {activeMenu: 'cart'});
	};

	node.addEventListener('submit', onSubmit);

	return () => {
		node.removeEventListener('submit', onSubmit);
	};
});
