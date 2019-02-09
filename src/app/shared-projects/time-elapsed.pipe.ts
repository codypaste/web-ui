import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'timeElapsed'})
export class TimeElapsedPipe implements PipeTransform {
  transform(dateTime: string): string {
    return moment(dateTime).fromNow()
  }
}