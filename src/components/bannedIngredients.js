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
					perView: 2,
					spacing: 40,
					origin: 'center',
				},
			},
			'(min-width: 1000px)': {
				loop: slides.length > 1,
				drag: slides.length > 1,
				slides: {
					perView: 3.75,
					spacing: 0,
					origin: 'center',
				},
			},
		},
	});

	// Function to update proximity classes based on active slide
	const updateProximityClasses = () => {
		const activeIndex = slider.track.details.rel;
		const totalSlides = slides.length;

		slides.forEach((slide, index) => {
			// Remove all existing proximity classes
			slide.classList.remove(
				'active-before',
				'active-after',
				'active-0',
				'active-1',
				'active-2',
				'active-3',
				'active-4',
			);

			// Calculate distance from active slide
			let distance = Math.abs(index - activeIndex);

			// Handle loop case - check both directions for shorter distance
			const distanceForward = Math.abs(index - activeIndex);
			const distanceBackward =
				Math.abs(index - (activeIndex + totalSlides)) % totalSlides;
			const distanceBackwardAlt =
				Math.abs(index - (activeIndex - totalSlides)) % totalSlides;
			distance = Math.min(
				distanceForward,
				distanceBackward,
				distanceBackwardAlt,
			);

			// Apply appropriate class based on distance
			if (distance <= 4) {
				slide.classList.add(`active-${distance}`);
			}

			// Add before/after classes based on relative position to active slide
			const relativeIndex =
				(index - activeIndex + totalSlides) % totalSlides;
			if (relativeIndex > totalSlides / 2) {
				// If relative index is in latter half, it's "before" in carousel
				slide.classList.add('active-before');
			} else if (relativeIndex > 0) {
				// If relative index is in first half but not active, it's "after"
				slide.classList.add('active-after');
			}
		});
	};

	// Listen for slide changes
	slider.on('slideChanged', updateProximityClasses);

	// Set initial proximity classes
	updateProximityClasses();

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
