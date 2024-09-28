const FORM_SELECTOR = '.shopify-challenge__container form';

export default () => {
	const form = document.querySelector(FORM_SELECTOR);

	if (!form) return;

	const input = document.createElement('input');

	input.type = 'hidden';
	input.name = 'return_to';
	input.value = '/account';

	form.appendChild(input);
};
