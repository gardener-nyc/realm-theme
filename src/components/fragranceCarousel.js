import {component} from 'picoapp';
import KeenSlider from 'keen-slider';

export default component((node, ctx) => {
	const sliderEl = node.querySelector('.keen-slider');
	const slides = node.querySelectorAll('.keen-slider__slide');
	const previousButton = node.querySelector('button[data-nav="previous"]');
	const nextButton = node.querySelector('button[data-nav="next"]');

	const slider = new KeenSlider(sliderEl, {
		loop: slides.length > 1,
		drag: slides.length > 1,
		slides: {
			perView: 1.25,
			spacing: 20,
			origin: 'center',
		},
		breakpoints: {
			'(min-width: 800px)': {
				loop: slides.length > 1,
				drag: slides.length > 1,
				slides: {
					perView: 1.25,
					spacing: 100,
					origin: 'center',
				},
			},
			'(min-width: 1200px)': {
				loop: slides.length > 1,
				drag: slides.length > 1,
				slides: {
					perView: 1,
					spacing: 350,
					origin: 'center',
				},
			},
		},
	});

	const onClickPrevious = () => {
		slider.prev();
	};

	const onClickNext = () => {
		slider.next();
	};

	previousButton.addEventListener('click', onClickPrevious);
	nextButton.addEventListener('click', onClickNext);

	return () => {
		previousButton.removeEventListener('click', onClickPrevious);
		nextButton.removeEventListener('click', onClickNext);
		slider.destroy();
	};
});
