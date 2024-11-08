import {component} from 'picoapp';
import KeenSlider from 'keen-slider';

export default component((node, ctx) => {
	const slides = node.querySelectorAll('.keen-slider__slide');

	const slider = new KeenSlider(node, {
		loop: slides.length > 2,
		drag: slides.length > 2,
		slides: {
			perView: 2,
			spacing: 10,
		},
		breakpoints: {
			'(min-width: 800px)': {
				loop: slides.length > 5,
				drag: slides.length > 5,
				slides: {
					perView: 5,
					spacing: 15,
				},
			},
		},
	});

	return () => {
		slider.destroy();
	};
});
