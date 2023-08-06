import { interval, forkJoin, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin

const samplePromise = (val) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
  );

/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example = forkJoin({
  //emit 'Hello' immediately
  first: of('Hello'),
  //emit 'World' after 1 second
  second: of('World').pipe(delay(1000)),

  src_3: interval(2000).pipe(take(1)),
  //emit 0...1 in 1 second interval
  src_4: interval(1000).pipe(take(2)),
  //promise that resolves to 'Promise Resolved' after 5 seconds
  src_5: samplePromise('FIN res'),

  google: ajax.getJSON('https://api.github.com/users/google'),
  microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
  users: ajax.getJSON('https://api.github.com/users'),
});

const subscribe = example.subscribe((val) => console.log(val));
