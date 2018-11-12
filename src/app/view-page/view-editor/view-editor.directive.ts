import {Directive, ElementRef} from '@angular/core';

declare var CodeMirror: any;

@Directive({
  selector: '[appViewEditor]'
})
export class ViewEditorDirective {
  editor: any;

  constructor(el: ElementRef) {
    CodeMirror.modeURL = 'cm-%N.js';

    this.editor = new CodeMirror.fromTextArea(el.nativeElement, {
      lineNumbers: true,
      readOnly: true,
    });

    setTimeout(() => {
      this.editor.refresh();
    }, 0);
  }
}
