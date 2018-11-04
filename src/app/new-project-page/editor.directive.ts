import { Directive, ElementRef } from '@angular/core';

declare var CodeMirror: any;

const loadScipt = async () => {
  return new Promise(resolve => {
    const scriptElement = document.createElement('script');
    scriptElement.src = 'lazy-loaded-script.js';
    scriptElement.onload = resolve;
    document.body.appendChild(scriptElement);
  });
};

@Directive({
  selector: '[appEditor]'
})
export class EditorDirective {
  editor: any;
  constructor(el: ElementRef) {
    this.editor = new CodeMirror.fromTextArea(el.nativeElement, {
      lineNumbers: true,
      mode: 'javascript',
      viewportMargin: 20,
    });

    setTimeout(() => {
      this.editor.refresh();
    }, 0);

    setTimeout(async () => {
      await loadScipt();
      this.editor.setOption('mode', 'javascript');
    }, 3000);
  }

}
