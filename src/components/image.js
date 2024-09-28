import {component} from 'picoapp';
import viewport from '../utils/viewport';
import {forEach} from 'lodash';

const SCROLL_THRESHOLD = 1.5; // lazy load at 0.5 screen heights away

export default component((node, ctx) => {
	const onLoad = () => {
		const picture = node.querySelector('picture');
		const sources = node.querySelectorAll('source');
		const imgs = node.querySelectorAll('img');

		// Load images
		forEach(imgs, img => {
			img.setAttribute('src', img.dataset.src);
		});

		// Load sources
		forEach(sources, source => {
			source.setAttribute('srcset', source.dataset.srcset);
		});

		// Show image
		picture.classList.remove('blur-xl', 'scale-110');

		viewport.unlisten(onScroll);
	};

	const onScroll = () => {
		const position = node.getBoundingClientRect();

		if (position.top <= window.innerHeight * SCROLL_THRESHOLD) {
			onLoad();
		}
	};

	viewport.listen(onScroll);
	onScroll();

	return () => {
		viewport.unlisten(onScroll);
	};
});
