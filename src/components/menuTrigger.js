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

	const onToggleMenu = () => {
		const {activeMenu} = ctx.getState();

		if (activeMenu === menuType) {
			ctx.emit('menu:toggle', {activeMenu: null});
		} else {
			ctx.emit('menu:toggle', {activeMenu: menuType});
		}
	};

	node.addEventListener('click', onToggleMenu);

	return () => {
		node.removeEventListener('click', onToggleMenu);
	};
});
