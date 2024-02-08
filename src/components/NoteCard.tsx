import { NoteDTO } from '../dtos/NoteDTO';

import * as Dialog from '@radix-ui/react-dialog';

import { formatDistanceToNow } from 'date-fns';

import { ptBR } from 'date-fns/locale';

import { X } from 'lucide-react';

interface NoteCardProps {
	note: NoteDTO;
	onNoteDeleted: (id: string) => void;
}

export const NoteCard = ({ note, onNoteDeleted }: NoteCardProps) => {
	return (
		<Dialog.Root>
			<Dialog.Trigger className='flex flex-col gap-3 rounded-md bg-slate-800 p-5 overflow-hidden relative text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
				<span className='text-sm font-medium text-slate-300'>
					{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
				</span>

				<p className='text-sm leading-6 text-slate-400'>{note.content}</p>
				
        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none' />
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className='inset-0 fixed bg-black/50'>
					<Dialog.Content className='fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md outline-none overflow-hidden'>
						<Dialog.Close className='absolute top-0 right-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
							<X className='size-5' />
						</Dialog.Close>

						<div className='flex flex-1 flex-col gap-3 p-5'>
							<span className='text-sm font-medium text-slate-300'>
								{formatDistanceToNow(note.date, {
									locale: ptBR,
									addSuffix: true,
								})}
							</span>
							<p className='text-sm leading-6 text-slate-400'>{note.content}</p>
						</div>

						<button
							type='button'
							className='w-full py-4 bg-slate-800 font-medium text-center text-sm text-slate-300 outline-none group'
							onClick={() => onNoteDeleted(note.id)}
						>
							Deseja{' '}
							<span className='text-red-400 group-hover:underline'>
								apagar essa nota
							</span>
							?
						</button>
					</Dialog.Content>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
