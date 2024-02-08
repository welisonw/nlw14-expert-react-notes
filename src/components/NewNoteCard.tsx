import { ChangeEvent, FormEvent, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { toast } from 'sonner';

import { X } from 'lucide-react';

export const NewNoteCard = () => {
	const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
	const [content, setContent] = useState('');

	function handleStartTextEditor() {
		setShouldShowOnboarding(false);
	}

	function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		setContent(event.target.value);

		if (!event.target.value.length) {
			setShouldShowOnboarding(true);
		}
	}

  // propriedade, estados, lidar com estados, 

	function handleSaveNote(event: FormEvent) {
		event.preventDefault();

    console.log(content);

    toast.success('Nota criada com sucesso!');
  }

	return (
		<Dialog.Root>
			<Dialog.Trigger className='flex flex-col gap-3 p-5 bg-slate-700 text-left rounded-md overflow-hidden outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
				<span className='text-sm font-medium text-slate-200'>
					Adicionar nota
				</span>
				<p className='text-sm leading-6 text-slate-400'>
					Grave uma nota em áudio que será convertida para texto
					automaticamente.
				</p>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className='inset-0 fixed bg-black/50'>
					<Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md outline-none overflow-hidden'>
						<Dialog.Close className='absolute top-0 right-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
							<X className='size-5' />
						</Dialog.Close>

						<form className='flex-1 flex flex-col' onSubmit={handleSaveNote}>
							<div className='flex flex-1 flex-col gap-3 p-5'>
								<span className='text-sm font-medium text-slate-300'>
									Adicionar nota
								</span>

								{shouldShowOnboarding ? (
									<p className='text-sm leading-6 text-slate-400'>
										Comece{' '}
										<button className='font-medium text-lime-400 hover:underline'>
											gravando uma nota
										</button>{' '}
										em áudio ou se preferir{' '}
										<button
											className='font-medium text-lime-400 hover:underline'
											onClick={handleStartTextEditor}
										>
											utilize apenas texto
										</button>
										.
									</p>
								) : (
									<textarea
										autoFocus
										className='flex-1 bg-transparent text-sm text-slate-400 leading-6 resize-none outline-none'
										onChange={handleContentChanged}
									/>
								)}
							</div>

							<button
								type='submit'
								className='w-full py-4 bg-lime-400 font-medium text-center text-sm text-lime-950 outline-none hover:bg-lime-500'
							>
								Salvar nota
							</button>
						</form>
					</Dialog.Content>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
