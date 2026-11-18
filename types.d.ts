import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          'auto-rotate'?: string;
          'camera-controls'?: string;
          'shadow-intensity'?: string | number;
          'camera-orbit'?: string;
          'environment-image'?: string;
          'exposure'?: string | number;
          'poster'?: string;
          'reveal'?: string;
          loading?: string;
          'touch-action'?: string;
          ar?: string;
          'ar-modes'?: string;
          'background-color'?: string;
          'interaction-prompt'?: string;
          'min-camera-orbit'?: string;
          'max-camera-orbit'?: string;
          'min-field-of-view'?: string;
          'max-field-of-view'?: string;
          'disable-zoom'?: string;
          'disable-pan'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
