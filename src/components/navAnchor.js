import scrollTo from '../utils/scrollTo';
import {component} from 'picoapp';

const HEADER_HEIGHT = 65;

export default component((node, ctx) => {
	const target = document.querySelector(node.getAttribute('href'));

	const onClick = event => {
		event.preventDefault();
		if (!target) return;

		const targetScroll = target.offsetTop;

		scrollTo(targetScroll - HEADER_HEIGHT);
	};

	node.addEventListener('click', onClick);

	return () => {
		node.removeEventListener('click', onClick);
	};
});
