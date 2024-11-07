import {component} from 'picoapp';

export default component((node, ctx) => {
	const menuType = node.dataset.menu;

	ctx.on('menu:toggle', state => {
		const {activeMenu} = state;

		if (activeMenu === menuType) {
			node.classList.add('active');
		} else {
			node.classList.remove('active');
		}
	});

	return () => {};
});
