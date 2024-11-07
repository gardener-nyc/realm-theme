import {component} from 'picoapp';
import 'keen-slider/keen-slider.min.css';
import KeenSlider from 'keen-slider';
import {forEach} from 'lodash';

export default component((node, ctx) => {
	const slides = node.querySelectorAll('.keen-slider__slide');
	const navButtons = node.querySelectorAll('button[data-index]');

	const slider = new KeenSlider(node, {
		loop: slides.length > 2,
		drag: slides.length > 2,
		slides: {
			perView: 1,
			spacing: 30,
			origin: 'center',
		},
		breakpoints: {
			'(min-width: 800px)': {
				slides: {
					perView: 2,
					spacing: 60,
					origin: 'center',
				},
			},
			'(min-width: 1200px)': {
				slides: {
					perView: 2,
					spacing: 120,
					origin: 'center',
				},
			},
		},
	});

	const updateActiveSlide = () => {
		forEach(slides, (slide, index) => {
			if (index === slider.track.details.rel) {
				slide.classList.add('active');
			} else {
				slide.classList.remove('active');
			}
		});

		forEach(navButtons, (button, index) => {
			if (index === slider.track.details.rel) {
				button.classList.add('active');
			} else {
				button.classList.remove('active');
			}
		});
	};

	const onClickNavButton = event => {
		const index = Number(event.target.dataset.index);
		slider.moveToIdx(index);

		console.log(index);
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
