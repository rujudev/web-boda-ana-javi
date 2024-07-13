import React, { forwardRef } from 'react';
import HowToGetContent from './HowToGetContent';
import ConfirmAssistContent from './ConfirmAssistContent';
import "../../styles/dialog.style.css"

export const dialogEnum = {
	HOW_TO_GET: 'how_to_get',
	HOW_TO_GET_CEREMONY: 'how_to_get_ceremony',
	HOW_TO_GET_CELEBRATION: 'how_to_get_celebration',
	CONFIRM_ASSIST: 'confirm_assist'
}

const Dialog = forwardRef(({ type }, ref) => {
	const closeModal = () => {
		if (ref) {
			const dialog = ref.current;

			console.log(dialog);

			if (dialog.classList.contains('confirm-assist')) {
				dialog.removeAttribute('class')
			}

			dialog.close();
		}
	}

	return (
		<dialog ref={ref} {...(type === dialogEnum.CONFIRM_ASSIST ? { 'className': 'confirm-assist' } : {})}>
			<button type="submit" className="button close" onClick={() => closeModal()}>
				<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
					<path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</button>
			{
				type && (
					type.includes(dialogEnum.HOW_TO_GET) ? (
						<HowToGetContent type={type} />
					) : (
						<ConfirmAssistContent />
					)
				)
			}
		</dialog>
	)
})

export default Dialog;