import { itemService } from '@/service/itemService';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const PublishedButton: React.FC<{ id: number }> = (props) => {
	const { data: session, status } = useSession();
	const router = useRouter()

	const publishItemHandler = async () => {
		try {
			const token = (session?.user as any).token;
			const result = await itemService.publishItem(props.id, token);
            if(result) {
              router.push('/auction');
            }
		} catch (error: any) {
			alert(error.message);
		}
	};

	return (
		<button className="btn-pill-orange" onClick={publishItemHandler}>
			Published
		</button>
	);
};

export default PublishedButton;
