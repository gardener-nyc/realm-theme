import {component} from 'picoapp';
import gsap from '@/lib/gsap';

export default component((node, ctx) => {
	const trigger = node.querySelector('button');
	const content = node.querySelector('.drawer-content');
	const indicator = node.querySelector('.drawer-indicator');

	const onToggle = async () => {
		const isOpen = content.style.display !== 'none';

		if (isOpen) {
			await Promise.all([
				gsap.to(content, {
					height: 0,
					duration: 400 / 1000,
					ease: 'power3.inOut',
				}),
				gsap.to(indicator, {
					rotate: 0,
					duration: 400 / 1000,
					ease: 'power3.inOut',
				}),
			]);

			// Reset style after close
			content.style.display = 'none';
			content.style.height = 0;
		} else {
			// Reset style before open
			content.style.height = 0;
			content.style.display = 'block';

			await Promise.all([
				gsap.to(content, {
					height: 'auto',
					duration: 400 / 1000,
					ease: 'power3.inOut',
				}),
				gsap.to(indicator, {
					rotate: 180,
					duration: 400 / 1000,
					ease: 'power3.inOut',
				}),
			]);
		}
	};

	trigger.addEventListener('click', onToggle);

	return () => {
		trigger.removeEventListener('click', onToggle);
	};
});
