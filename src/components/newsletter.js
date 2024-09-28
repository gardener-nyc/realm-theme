import {component} from 'picoapp';
import {email as emailRegex} from '../utils/regex';
import {subscribe} from 'klaviyo-subscribe';

const VALID_EMAIL_CAPTION = 'Please enter a valid email';
const DEFAULT_SUCCESS = 'Thanks!';

export default component((node, ctx) => {
	let shouldValidateOnInput = false;

	const klaviyoListId = node.dataset.listId;
	const klaviyoSourceId = node.dataset.sourceId || '';
	const successMessage = node.dataset.successMessage || DEFAULT_SUCCESS;

	console.log({
		klaviyoListId,
		klaviyoSourceId,
		successMessage,
		dataset: node.dataset,
	});

	const caption = node.querySelector('.newsletter__caption');
	const input = node.querySelector('.newsletter__input');
	const submit = node.querySelector('button[type="submit"]');

	const showCaption = value => {
		caption.style.display = null;
		caption.innerHTML = value;
	};

	const hideCaption = () => {
		caption.style.display = 'none';
		caption.innerHTML = '';
	};

	const showLoading = value => {
		submit.disabled = true;
		input.classList.add('loading');
		submit.classList.add('loading');
	};

	const hideLoading = () => {
		submit.disabled = false;
		input.classList.remove('loading');
		submit.classList.remove('loading');
	};

	const onSubscribe = async email => {
		showLoading();

		try {
			await subscribe(klaviyoListId, email, {
				$fields: ['$source'],
				$source: klaviyoSourceId,
			});

			showCaption(successMessage);
		} catch (error) {
			console.log(error);
		}

		hideLoading();
	};

	const onInput = event => {
		if (shouldValidateOnInput) {
			if (emailRegex.test(event.target.value)) {
				shouldValidateOnInput = false;
				hideCaption();
			} else {
				shouldValidateOnInput = true;
				showCaption(VALID_EMAIL_CAPTION);
			}
		}
	};

	const onSubmit = event => {
		event.preventDefault();

		const email = input.value;
		const isValid = emailRegex.test(email);

		if (isValid) {
			shouldValidateOnInput = false;
			hideCaption();
			onSubscribe(email);
		} else {
			shouldValidateOnInput = true;
			showCaption(VALID_EMAIL_CAPTION);
		}
	};

	node.addEventListener('submit', onSubmit);
	node.addEventListener('input', onInput);

	return () => {
		node.removeEventListener('submit', onSubmit);
		node.removeEventListener('input', onInput);
	};
});
