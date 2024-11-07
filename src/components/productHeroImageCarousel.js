import {component} from 'picoapp';
import 'keen-slider/keen-slider.min.css';
import KeenSlider from 'keen-slider';
import {forEach} from 'lodash';

export default component((node, ctx) => {
	const sliderEl = node.querySelector('.keen-slider');
	const slides = node.querySelectorAll('.keen-slider__slide');
	const navButtons = node.querySelectorAll('button[data-index]');

	const slider = new KeenSlider(sliderEl, {
		loop: slides.length > 1,
		drag: slides.length > 1,
		slides: {
			perView: 1,
		},
	});

	const updateActiveSlide = () => {
		forEach(navButtons, button => {
			const index = Number(button.dataset.index);

			if (index === slider.track.details.rel) {
				button.classList.add('active');
			} else {
				button.classList.remove('active');
			}
		});
	};

	const onClickNavButton = event => {
		const index = Number(event.currentTarget.dataset.index);
		slider.moveToIdx(index);
	};

	slider.on('detailsChanged', updateActiveSlide);

	forEach(navButtons, button => {
		button.addEventListener('click', onClickNavButton);
	});

	updateActiveSlide();

	return () => {
		slider.destroy();

		forEach(navButtons, button => {
			button.addEventListener('click', onClickNavButton);
		});
	};
});
