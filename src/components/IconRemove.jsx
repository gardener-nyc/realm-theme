import React from 'react';

export default function IconRemove(props) {
	return (
		<svg width="10" height="10" viewBox="0 0 10 10" {...props}>
			<path d="M1 1L9 9" stroke="currentColor" />
			<path d="M9 1L1 9" stroke="currentColor" />
		</svg>
	);
}
