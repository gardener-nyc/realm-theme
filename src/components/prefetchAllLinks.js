export default () => {
	const links = document.querySelectorAll('a');

	const prefetchLink = event => {
		const href = event.currentTarget.href;

		const linkEl = document.createElement('link');

		linkEl.rel = 'prefetch';
		linkEl.href = href;
		linkEl.as = 'document';

		document.head.appendChild(linkEl);

		// Remove listener after prefetch
		event.currentTarget.removeEventListener('click', prefetchLink);
	};

	links.forEach(link => {
		link.addEventListener('click', prefetchLink);
	});

	return () => {
		links.forEach(link => {
			link.removeEventListener('click', prefetchLink);
		});
	};
};
