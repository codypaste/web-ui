import { Pipe, PipeTransform } from '@angular/core';
import * as distanceInWords from 'date-fns/distance_in_words';
import * as parse from 'date-fns/parse';

@Pipe({name: 'timeElapsed'})
export class TimeElapsedPipe implements PipeTransform {
  transform(dateTime: string): string {
    const now = new Date();
    const projectCreated = parse(dateTime);
    return distanceInWords(projectCreated, now);
  }
}
