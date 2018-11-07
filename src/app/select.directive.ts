import { Directive } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewProjectState } from './_store/newProjectStore';
import * as fromActions from './_store/actions';

declare var $: any;

const alreadyLoaded = [];

const loadScipt = async (scriptName) => {
  // return new Promise(resolve => {
  //   const scriptElement = document.createElement('script');
  //   scriptElement.src = scriptName;
  //   scriptElement.onload = resolve;
  //   document.body.appendChild(scriptElement);
  // });
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
          const targetScriptName = `cm-${val}.js`;

          if (val === 'null' || alreadyLoaded.includes(targetScriptName)) {
            return;
          }
          await loadScipt(targetScriptName);
          alreadyLoaded.push(targetScriptName);
          this.store.dispatch(new fromActions.SetSyntaxForActiveEditorAction(val));
        }
      });
    }, 0);
  }

}
