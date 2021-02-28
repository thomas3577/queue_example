import { Observable, of, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

class Queue {
  private readonly _queueSubject: Subject<Observable<any>> = new Subject();

  constructor() {
    this._queueSubject
      .pipe(
        mergeMap(obs$ => obs$, 1)
      )
      .subscribe((count: number) => console.log('>>> Count', count));
  }

  public append(obs$: Observable<any>): void {
    this._queueSubject.next(obs$);
  }
}

const queue = new Queue();

let count = 0;

setInterval(() => queue.append(of(++count)), 10);
