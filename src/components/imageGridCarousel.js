import {component} from 'picoapp';
import 'keen-slider/keen-slider.min.css';
import KeenSlider from 'keen-slider';

export default component((node, ctx) => {
	const slides = node.querySelectorAll('.keen-slider__slide');

	const slider = new KeenSlider(node, {
		loop: slides.length > 2,
		drag: slides.length > 2,
		slides: {
			perView: 1.5,
			spacing: 10,
		},
		breakpoints: {
			'(min-width: 800px)': {
				loop: slides.length > 3,
				drag: slides.length > 3,
				slides: {
					perView: 3,
					spacing: 15,
				},
			},
		},
	});

	return () => {
		slider.destroy();
	};
});
