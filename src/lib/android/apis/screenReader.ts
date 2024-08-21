import { TextToSpeech } from '@capacitor-community/text-to-speech';

export let options = {
	lang: 'pt-BR',
	rate: 1.0,
	pitch: 1.0,
	volume: 1.0,
	category: 'ambient'
};
export async function speak(text: string) {
	await TextToSpeech.speak({ text, ...options });
}
