import { Directive, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { NewProjectState, getActiveEditorSyntax } from '../../_store/newProjectStore';
import * as fromActions from '../../_store/actions';
import { Observable, Subscription } from 'rxjs';

declare var $: any;
@Directive({
  selector: '[appSelect]'
})
export class SelectDirective implements OnDestroy {

  activeEditorSyntax$: Observable<string>;
  syntaxSub: Subscription;
  syntax: string;


  constructor(
    private store: Store<NewProjectState>
  ) {
    this.activeEditorSyntax$ = store.pipe(select(getActiveEditorSyntax));
    this.syntaxSub = this.activeEditorSyntax$.subscribe(syntax => {
      $('#syntaxSelector').dropdown('set selected', syntax);
    });

    setTimeout(() => {
      $('#syntaxSelector').dropdown({
        onChange: async (val) => {
          this.store.dispatch(new fromActions.SetSyntaxForActiveEditorAction(val));
        }
      });

      $('#syntaxSelector').dropdown('set selected', 'Plain Text');
    }, 0);
  }

  ngOnDestroy() {
    this.syntaxSub.unsubscribe();
  }

}
