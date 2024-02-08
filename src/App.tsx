/* eslint-disable no-mixed-spaces-and-tabs */
import { ChangeEvent, useState } from 'react';

import Logo from './assets/logo.svg';

import { NewNoteCard } from './components/NewNoteCard';
import { NoteCard } from './components/NoteCard';
import { NoteDTO } from './dtos/NoteDTO';

export function App() {
	const [search, setSearch] = useState('');
	const [notes, setNotes] = useState<NoteDTO[]>(() => {
		const notesOnStorage = localStorage.getItem('nlw-expert-react-notes');

		if (notesOnStorage) {
			return JSON.parse(notesOnStorage);
		}

		return [];
	});

	const filteredNotes =
		search !== ''
			? notes.filter(note =>
					note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
			  )
			: notes;

	function handleSearch(event: ChangeEvent<HTMLInputElement>) {
		event.preventDefault();

		const query = event.target.value;

		setSearch(query);
	}

	function onNoteCreated(content: string) {
		const newNote: NoteDTO = {
			id: crypto.randomUUID(),
			date: new Date(),
			content,
		};

		const notesArray = [newNote, ...notes];

		setNotes(notesArray);

		localStorage.setItem('nlw-expert-react-notes', JSON.stringify(notesArray));
	}

	function onNoteDeleted(id: string) {
		const noteToBeDeleted = notes.filter(note => note.id !== id);

		setNotes(noteToBeDeleted);

		localStorage.setItem(
			'nlw-expert-react-notes',
			JSON.stringify(noteToBeDeleted)
		);
	}

	return (
		<div className='max-w-6xl mx-auto my-12 px-10 space-y-6'>
			<img src={Logo} alt='logo nlw expert' />

			<form action='' className='w-full'>
				<input
					type='text'
					placeholder='Busque em suas notas...'
					className='w-full bg-transparent text-lg md:text-2xl lg:text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
					onChange={handleSearch}
				/>
			</form>

			<div className='h-px bg-slate-700' />

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] '>
				<NewNoteCard onNoteCreated={onNoteCreated} />

				{filteredNotes.map(note => (
					<NoteCard
						key={note.id}
						note={note}
						onNoteDeleted={() => onNoteDeleted(note.id)}
					/>
				))}
			</div>
		</div>
	);
}
