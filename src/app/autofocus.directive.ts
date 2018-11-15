import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {

  element: ElementRef;

  constructor(el: ElementRef) {
    this.element = el;
  }

  ngOnInit() {
    this.element.nativeElement.focus();
  }
}
