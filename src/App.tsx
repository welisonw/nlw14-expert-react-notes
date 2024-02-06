import Logo from './assets/logo.svg';

import { NewNoteCard } from './components/NewNoteCard';
import { NoteCard } from './components/NoteCard';

export function App() {
	return (
		<div className='max-w-6xl mx-auto my-12 space-y-6'>
			<img src={Logo} alt='logo nlw expert' />

			<form action='' className='w-full'>
				<input
					type='text'
					placeholder='Busque em suas notas...'
					className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
				/>
			</form>

			<div className='h-px bg-slate-700' />

			<div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
				<NewNoteCard />

				<NoteCard />
				<NoteCard />
				<NoteCard />
				<NoteCard />
			</div>
		</div>
	);
}
