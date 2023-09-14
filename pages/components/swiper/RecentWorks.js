import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import img from '../../../../public/images/swiper-1.jpg';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { useSwiper } from 'swiper/react';
import SwiperNavButton from './SwiperNavButton';

const RecentWorks = () => {
	const swiper = useSwiper();

	return (
		<>
			<Swiper
				spaceBetween={20}
				slidesPerView={1}
			>
				<SwiperSlide>
					<div className="loop-item bg-white rounded-t-xl">
						<div className="p-7 pb-4 rounded-b-none">
							<a href="" className="btn-pill mb-5">
								HEALTHCARE
							</a>
							<a className="text-brown mb-3 block">
								<h3 className="">
									Understanding urban communities for a chain
									of low-cost clinics
								</h3>
							</a>
							<p>
								Ethnographic research, Prototype testing,
								Participatory Design
							</p>
						</div>
						<div>
							<Image
								src={img}
								className="rounded-xl min-h-[22rem] object-cover"
							/>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="loop-item bg-white rounded-t-xl">
						<div className="p-7 pb-4 rounded-b-none">
							<a href="" className="btn-pill mb-5">
								HEALTHCARE
							</a>
							<a className="text-brown mb-3 block">
								<h3 className="">
									Understanding urban communities for a chain
									of low-cost clinics
								</h3>
							</a>
							<p>
								Ethnographic research, Prototype testing,
								Participatory Design
							</p>
						</div>
						<div>
							<Image
								src={img}
								className="rounded-xl min-h-[22rem] object-cover"
							/>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="loop-item bg-white rounded-t-xl">
						<div className="p-7 pb-4 rounded-b-none">
							<a href="" className="btn-pill mb-5">
								HEALTHCARE
							</a>
							<a className="text-brown mb-3 block">
								<h3 className="">
									Understanding urban communities for a chain
									of low-cost clinics
								</h3>
							</a>
							<p>
								Ethnographic research, Prototype testing,
								Participatory Design
							</p>
						</div>
						<div>
							<Image
								src={img}
								className="rounded-xl min-h-[22rem] object-cover"
							/>
						</div>
					</div>
				</SwiperSlide>

				<SwiperNavButton />
			</Swiper>
		</>
	);
};

export default RecentWorks;
