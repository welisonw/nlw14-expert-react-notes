export const NoteCard = () => {
	return (
		<button className='space-y-3 rounded-md bg-slate-800 p-5 overflow-hidden relative text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
			<span className='text-small font-medium text-slate-300'>Há 2 dias</span>

			<p className='text-small leading-6 text-slate-400'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur iure
				atque provident harum porro deserunt quis nisi iusto alias. Fugit
				obcaecati odit vel expedita et aliquam adipisci iste autem dolore!
			</p>

			<div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none' />
		</button>
	);
};
