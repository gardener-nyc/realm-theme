import {component} from 'picoapp';
import {addItemsToCart} from '../api/cart';

export default component((node, ctx) => {
	const productIdInput = node.querySelector('input[name="id"]');
	const quantityInput = node.querySelector('input[name="quantity"]');
	const sellingPlanSelect = node.querySelector(
		'select[name="selling-plan-select"]',
	);
	const sellingPlanIdInput = node.querySelector(
		'input[name="selling_plan_id"]',
	);
	const oneTimeOptionInput = node.querySelector(
		'input[name="purchase_type"][value="one-time"]',
	);
	const subscriptionOptionInput = node.querySelector(
		'input[name="purchase_type"][value="subscription"]',
	);
	const submitButton = node.querySelector('button[type="submit"]');

	const onSelectOneTime = () => {
		oneTimeOptionInput.checked = true;
		subscriptionOptionInput.checked = false;
	};

	const onSelectSubscription = () => {
		oneTimeOptionInput.checked = false;
		subscriptionOptionInput.checked = true;
	};

	const onChangeSellingPlan = () => {
		const selectedOption =
			sellingPlanSelect.options[sellingPlanSelect.selectedIndex];
		const planId = selectedOption.value;

		sellingPlanIdInput.value = planId;
	};

	const onSubmit = async event => {
		event.preventDefault();

		const productId = productIdInput ? Number(productIdInput.value) : null;
		const quantity = quantityInput ? Number(quantityInput.value) : 1;
		const sellingPlanId = sellingPlanIdInput
			? Number(sellingPlanIdInput.value)
			: null;

		if (!productId) throw new Error('No product ID is set');

		if (submitButton) {
			submitButton.disabled = true;
			submitButton.classList.add('loading');
		}

		try {
			const cartItem = {
				id: productId,
				quantity,
			};

			if (sellingPlanId && subscriptionOptionInput.checked) {
				cartItem.selling_plan = sellingPlanId;
			}

			const cart = await addItemsToCart([cartItem]);

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

	if (oneTimeOptionInput) {
		oneTimeOptionInput.addEventListener('click', onSelectOneTime);
	}

	if (subscriptionOptionInput) {
		subscriptionOptionInput.addEventListener('click', onSelectSubscription);
	}

	if (sellingPlanSelect) {
		sellingPlanSelect.addEventListener('change', onChangeSellingPlan);
	}

	return () => {
		node.removeEventListener('submit', onSubmit);

		if (oneTimeOptionInput) {
			oneTimeOptionInput.removeEventListener('click', onSelectOneTime);
		}

		if (subscriptionOptionInput) {
			subscriptionOptionInput.removeEventListener(
				'click',
				onSelectSubscription,
			);
		}

		if (sellingPlanSelect) {
			sellingPlanSelect.removeEventListener(
				'change',
				onChangeSellingPlan,
			);
		}
	};
});
