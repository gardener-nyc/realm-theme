import {component} from 'picoapp';

export default component((node, ctx) => {
	const menuType = node.dataset.menu;

	const onToggleMenu = () => {
		const {activeMenu} = ctx.getState();

		if (activeMenu === menuType) {
			node.classList.remove('active');
			ctx.emit('menu:toggle', {activeMenu: null});
		} else {
			node.classList.add('active');
			ctx.emit('menu:toggle', {activeMenu: menuType});
		}
	};

	node.addEventListener('click', onToggleMenu);

	return () => {
		node.removeEventListener('click', onToggleMenu);
	};
});
