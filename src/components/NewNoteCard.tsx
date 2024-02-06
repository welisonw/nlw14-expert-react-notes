export const NewNoteCard = () => {
	return (
		<div className='space-y-3 rounded-md bg-slate-700 p-5 overflow-hidden'>
			<span className='text-small font-medium text-slate-200'>
				Adicionar nota
			</span>

			<p className='text-small leading-6 text-slate-400'>
				Grave uma nota em áudio que será convertida para texto automaticamente.
			</p>
		</div>
	);
};
