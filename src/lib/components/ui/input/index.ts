import { tv, type VariantProps } from 'tailwind-variants';
import Root from './input.svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
export const inputVariants = tv({
	base: 'border-input bg-background ring-offset-background placeholder:text-muted-foreground flex h-10 w-full rounded-md  px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium  disabled:cursor-not-allowed disabled:opacity-50',
	variants: {
		variant: {
			default:
				'border focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ',
			underline: 'border-b rounded-none focus:outline-none'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});

export type FormInputEvent<T extends Event = Event> = T & {
	currentTarget: EventTarget & HTMLInputElement;
};

export type Variant = VariantProps<typeof inputVariants>['variant'];

export type InputEvents = {
	blur: FormInputEvent<FocusEvent>;
	change: FormInputEvent<Event>;
	click: FormInputEvent<MouseEvent>;
	focus: FormInputEvent<FocusEvent>;
	focusin: FormInputEvent<FocusEvent>;
	focusout: FormInputEvent<FocusEvent>;
	keydown: FormInputEvent<KeyboardEvent>;
	keypress: FormInputEvent<KeyboardEvent>;
	keyup: FormInputEvent<KeyboardEvent>;
	mouseover: FormInputEvent<MouseEvent>;
	mouseenter: FormInputEvent<MouseEvent>;
	mouseleave: FormInputEvent<MouseEvent>;
	mousemove: FormInputEvent<MouseEvent>;
	paste: FormInputEvent<ClipboardEvent>;
	input: FormInputEvent<InputEvent>;
	wheel: FormInputEvent<WheelEvent>;
};

export type Props = HTMLInputAttributes & {
	variant?: Variant;
};

export {
	Root,
	//
	Root as Input
};
