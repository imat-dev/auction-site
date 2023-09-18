// components/Modal.tsx

import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
	isOpen: boolean;
	children: React.ReactNode;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
	const [el, setEl] = useState<HTMLElement | null>(null);

	useEffect(() => {
		const div = document.createElement('div');
		setEl(div);
		document.body.appendChild(div);

		return () => {
			document.body.removeChild(div);
		};
	}, []);

	if (!isOpen || !el) return null;

	return ReactDOM.createPortal(
		<div className="fixed inset-0 flex items-center justify-center z-[999] ">
			<div className="bg-white p-10 rounded w-full md:w-1/2 shadow-lg z-50">
				{children}
			</div>
			<div
				className="fixed inset-0 bg-black opacity-50"
				onClick={onClose}
			></div>
		</div>,
		el
	);
};

export default Modal;
