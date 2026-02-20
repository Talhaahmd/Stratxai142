import { HTMLAttributes } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'spline-viewer': HTMLAttributes<HTMLElement> & {
                url?: string;
                'events-target'?: string;
                loading?: 'eager' | 'lazy';
            };
        }
    }
}
