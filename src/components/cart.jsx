import React, {useState} from 'react';
import cx from 'classnames';
import ReactDOM from 'react-dom/client';
import {min} from 'lodash';
import {component} from 'picoapp';
import centsToPriceNoTrailingZeros from '../utils/centsToPriceNoTrailingZeros';
import IconRemove from './IconRemove';
import IconMinus from './IconMinus';
import IconPlus from './IconPlus';
import {updateCart} from '../api/cart';

const CartFreeShippingIndicator = ({totalPrice, freeShippingThreshold}) => {
	const freeShippingRemainder = freeShippingThreshold - totalPrice;
	const freeShippingPercentage = min([totalPrice / freeShippingThreshold, 1]);

	const successState = freeShippingRemainder <= 0 && (
		<p className="font-serif text-18/24">Your order ships free!</p>
	);

	const progressState = freeShippingRemainder > 0 && (
		<p className="font-serif text-18/24">
			You are {centsToPriceNoTrailingZeros(freeShippingRemainder)} away
			from free shipping!
		</p>
	);

	const freeShippingBar = (
		<div className="h-1 bg-white rounded-2">
			<div
				className="h-1 bg-violet rounded-2 transition-all duration-400 ease-appear"
				style={{width: `${freeShippingPercentage * 100}%`}}
			/>
		</div>
	);

	return (
		<div className="flex flex-col gap-1 pb-2">
			{successState}
			{progressState}
			{freeShippingBar}
		</div>
	);
};

const CartItem = ({
	id,
	title,
	quantity,
	line_price = 0,
	image,
	onUpdateCart,
}) => {
	const [isUpdating, setUpdating] = useState(false);
	const titleParts = title.split('-');

	const onClickRemove = async () => {
		setUpdating(true);
		await onUpdateCart({[id]: 0});
		setUpdating(false);
	};

	const onClickMinus = async () => {
		setUpdating(true);
		await onUpdateCart({[id]: quantity - 1});
		setUpdating(false);
	};

	const onClickPlus = async () => {
		setUpdating(true);
		await onUpdateCart({[id]: quantity + 1});
		setUpdating(false);
	};

	const header = (
		<div>
			<div className="flex justify-between">
				<p
					className="text-18/24 uppercase"
					dangerouslySetInnerHTML={{__html: titleParts[0]}}
				/>

				<button
					disabled={isUpdating}
					aria-label={`Remove ${titleParts}`}
					onClick={onClickRemove}
					className={cx({
						loading: isUpdating,
					})}>
					<IconRemove className="block" />
				</button>
			</div>

			<div className="flex justify-between">
				<p
					className="text-14/18 font-serif"
					dangerouslySetInnerHTML={{__html: titleParts[1]}}
				/>

				<p className="text-14/18">
					{centsToPriceNoTrailingZeros(line_price)}
				</p>
			</div>
		</div>
	);

	const footer = (
		<div className="flex">
			<div className="button button-primary w-14 relative">
				<button
					disabled={isUpdating}
					onClick={onClickMinus}
					className={cx(
						'block link-opacity-hover px-2 py-1 absolute inset-y-0 left-0',
						{loading: isUpdating},
					)}>
					<IconMinus className="block" />
				</button>
				<div>{quantity}</div>
				<button
					disabled={isUpdating}
					onClick={onClickPlus}
					className={cx(
						'block link-opacity-hover px-2 py-1 absolute inset-y-0 right-0',
						{loading: isUpdating},
					)}>
					<IconPlus className="block" />
				</button>
			</div>
		</div>
	);

	return (
		<div className="flex gap-1">
			<div className="w-10">
				{image && (
					<div className="image w-full aspect-square">
						<picture>
							<img src={`${image}?w=400`} alt={title} />
						</picture>
					</div>
				)}
			</div>

			<div className="flex-grow flex flex-col gap-1 justify-between">
				{header}
				{footer}
			</div>
		</div>
	);
};

const Cart = ({cart, freeShippingThreshold = 0, onUpdateCart = () => {}}) => {
	const {items = [], items_subtotal_price = 0} = cart;
	const isFreeShippingEnabled = freeShippingThreshold > 0;

	const freeShippingIndicator = isFreeShippingEnabled && (
		<CartFreeShippingIndicator
			totalPrice={items_subtotal_price}
			freeShippingThreshold={freeShippingThreshold}
		/>
	);

	return (
		<div className="flex-grow flex flex-col max-h-full">
			{freeShippingIndicator}
			<div className="flex-grow overflow-y-auto scroll-touch gap-y-container-mobile md:gap-y-container-desktop pb-2">
				{items.map(item => (
					<CartItem {...item} onUpdateCart={onUpdateCart} />
				))}
			</div>
		</div>
	);
};

export default component((node, ctx) => {
	const {cart} = ctx.getState();
	const freeShippingThreshold =
		Number(node.dataset.freeShippingThreshold) || 0;

	const root = ReactDOM.createRoot(node);

	const onUpdateCart = async updates => {
		const cart = await updateCart(updates);
		ctx.emit('cart:update', {cart});
	};

	ctx.on('cart:update', ({cart}) => {
		root.render(
			<Cart
				cart={cart}
				freeShippingThreshold={freeShippingThreshold}
				onUpdateCart={onUpdateCart}
			/>,
		);
	});

	// Initial render
	root.render(
		<Cart
			cart={cart}
			freeShippingThreshold={freeShippingThreshold}
			onUpdateCart={onUpdateCart}
		/>,
	);

	return () => {
		root.unmount();
	};
});
