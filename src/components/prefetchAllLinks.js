export default () => {
	const links = document.querySelectorAll('a');

	const prefetchLink = event => {
		const href = event.currentTarget.getAttribute('href');

		const linkEl = document.createElement('link');

		linkEl.rel = 'prefetch';
		linkEl.href = href;

		document.head.appendChild(linkEl);

		// Remove listener after prefetch
		event.currentTarget.removeEventListener('click', prefetchLink);
	};

	links.forEach(link => {
		link.addEventListener('mouseenter', prefetchLink);
	});

	return () => {
		links.forEach(link => {
			link.removeEventListener('mouseenter', prefetchLink);
		});
	};
};
