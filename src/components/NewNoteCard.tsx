import { ChangeEvent, FormEvent, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { toast } from 'sonner';

import { X } from 'lucide-react';

interface NewNoteCardProps {
	onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export const NewNoteCard = ({ onNoteCreated }: NewNoteCardProps) => {
	const [isRecording, setIsRecording] = useState(false);
	const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
	const [content, setContent] = useState('');

	function handleStartRecording() {
		setIsRecording(true);
    setShouldShowOnboarding(false);

		const isSpeechRecognitionAPIAvailable =
			'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

		if (!isSpeechRecognitionAPIAvailable) {
			return alert('Infelizmente, seu navegador não suporta a API de gravação');
		}

		const SpeechRecognitionAPI =
			window.SpeechRecognition || window.webkitSpeechRecognition;

		speechRecognition = new SpeechRecognitionAPI();

		speechRecognition.lang = 'pt-BR';
		speechRecognition.continuous = true;
		speechRecognition.maxAlternatives = 1;
		speechRecognition.interimResults = true;

		speechRecognition.onresult = event => {
      const transcription = Array.from(event.results).reduce((accum, curr) => {
        return accum.concat(curr[0].transcript);
      }, '');

      setContent(transcription)
		};

		speechRecognition.onerror = event => {
			console.error(event);
		};

    speechRecognition.start();
	}

	function handleStopRecording() {
		setIsRecording(false);

    speechRecognition?.stop();
	}

	function handleStartTextEditor() {
		setShouldShowOnboarding(false);
	}

	function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		setContent(event.target.value);

		if (!event.target.value.length) {
			setShouldShowOnboarding(true);
		}
	}

	function handleSaveNote(event: FormEvent) {
		event.preventDefault();

		if (!content.trim()) return;

		onNoteCreated(content);

		setContent('');

		setShouldShowOnboarding(true);

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
					<Dialog.Content className='fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md outline-none overflow-hidden'>
						<Dialog.Close className='absolute top-0 right-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
							<X className='size-5' />
						</Dialog.Close>

						<form className='flex-1 flex flex-col'>
							<div className='flex flex-1 flex-col gap-3 p-5'>
								<span className='text-sm font-medium text-slate-300'>
									Adicionar nota
								</span>

								{shouldShowOnboarding ? (
									<p className='text-sm leading-6 text-slate-400'>
										Comece{' '}
										<button
											type='button'
											className='font-medium text-lime-400 hover:underline'
											onClick={handleStartRecording}
										>
											gravando uma nota
										</button>{' '}
										em áudio ou se preferir{' '}
										<button
											type='button'
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
										value={content}
										onChange={handleContentChanged}
									/>
								)}
							</div>

							{isRecording ? (
								<button
									type='button'
									className='flex items-center justify-center gap-2 w-full py-4 bg-slate-900 font-medium text-center text-sm text-slate-300 outline-none hover:text-slate-100'
									onClick={handleStopRecording}
								>
									<div className='size-3 bg-red-500 rounded-full animate-pulse ' />
									Gravando... (Clique para interromper)
								</button>
							) : (
								<button
									type='button'
									className='w-full py-4 bg-lime-400 font-medium text-center text-sm text-lime-950 outline-none hover:bg-lime-500'
									onClick={handleSaveNote}
								>
									Salvar nota
								</button>
							)}
						</form>
					</Dialog.Content>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
