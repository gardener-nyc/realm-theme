import {component} from 'picoapp';
import 'keen-slider/keen-slider.min.css';
import KeenSlider from 'keen-slider';

export default component((node, ctx) => {
	const slider = new KeenSlider(node, {
		loop: true,
		slides: {
			perView: 2,
			spacing: 10,
		},
		breakpoints: {
			'(min-width: 800px)': {
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
