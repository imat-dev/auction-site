import React from 'react';
import { useSwiper } from 'swiper/react';

const SwiperNavButton = () => {
	const swiper = useSwiper();
	return (
		<div className="mt-[3.5rem] flex justify-center">
			<button onClick={() => swiper.slidePrev()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="33"
					height="33"
					fill="none"
				>
					<path
						d="M17.4703 30.9406L2.99997 16.4702L17.4703 1.99986"
						stroke="#4A3D33"
						stroke-width="3"
						stroke-linecap="round"
					/>
				</svg>
			</button>
			<button onClick={() => swiper.slideNext()}>	<svg
					xmlns="http://www.w3.org/2000/svg"
					width="102"
					height="33"
					fill="none"
				>
					<path
						d="M84.4701 1.99986L98.9405 16.4702L84.4701 30.9406"
						stroke="#4A3D33"
						stroke-width="3"
						stroke-linecap="round"
					/>
				</svg></button>
		</div>
	);
};

export default SwiperNavButton;
