import { Directive } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewProjectState } from './_store/newProjectStore';
import * as fromActions from './_store/actions';

declare var $: any;

const alreadyLoaded = [];

const loadScipt = async (scriptName) => {
  return new Promise(resolve => {
    const scriptElement = document.createElement('script');
    scriptElement.src = scriptName;
    scriptElement.onload = resolve;
    document.body.appendChild(scriptElement);
  });
};


@Directive({
  selector: '[appSelect]'
})
export class SelectDirective {

  constructor(
    private store: Store<NewProjectState>
  ) {
    setTimeout(() => {
      $('.ui.dropdown').dropdown({
        onChange: async (val) => {
          if (val === 'null') {
            this.store.dispatch(new fromActions.SetSyntaxForActiveEditorAction(val));
            return;
          }
          const targetScriptName = `cm-${val}.js`;
          if (!alreadyLoaded.includes(targetScriptName)) {
            await loadScipt(targetScriptName);
            this.store.dispatch(new fromActions.SetSyntaxForActiveEditorAction(val));
            alreadyLoaded.push(targetScriptName);
          }
        }
      });
    }, 0);
  }

}
