export const getCart = async () => {
	const response = await fetch('/cart.js');
	const cart = await response.json();

	return cart;
};

export const addItemsToCart = async (items = []) => {
	await fetch('/cart/add.js', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({items}),
	});

	// Return entire cart object after adding items
	const cart = await getCart();

	return cart;
};
