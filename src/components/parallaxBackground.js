import {component} from 'picoapp';
import gsap from '@/lib/gsap';

export default component((node, ctx) => {
	const factor = node.dataset.scrollFactor
		? parseFloat(node.dataset.scrollFactor)
		: 0.2;

	gsap.fromTo(
		node,
		{
			y: 0,
		},
		{
			y: () => node.clientHeight * factor,
			ease: 'none',
			scrollTrigger: {
				trigger: node.parentElement,
				scrub: true,
				invalidateOnRefresh: true,
				start: 'top top',
				end: 'bottom top',
			},
		},
	);

	return () => {
		const trigger = gsap.getById(node);

		if (trigger) {
			trigger.kill();
		}
	};
});
