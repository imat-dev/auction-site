import React from 'react';
import MainNavigation from './MainNavigation';

const MainLayout: React.FC<{ children: React.ReactNode }> = (props) => {
	return (
		<>
			<MainNavigation />
			<div id="main" className='mt-[4rem]'>{props.children}</div>
		</>
	);
};

export default MainLayout;
