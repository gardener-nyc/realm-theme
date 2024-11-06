import {component} from 'picoapp';
import gsap from '@/lib/gsap';

export default component((node, ctx) => {
	const factor = node.dataset.scrollFactor
		? parseFloat(node.dataset.scrollFactor)
		: 0.25;

	const start = node.dataset.scrollStart || 'top bottom';
	const end = node.dataset.scrollEnd || 'bottom top';

	gsap.to(node, {
		y: () => node.clientHeight * factor,
		ease: 'none',
		scrollTrigger: {
			trigger: node.parentElement,
			scrub: true,
			invalidateOnRefresh: true,
			start,
			end,
		},
	});

	return () => {
		const trigger = gsap.getById(node);

		if (trigger) {
			trigger.kill();
		}
	};
});
