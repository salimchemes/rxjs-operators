export const operators = [
  {
    id: 'of',
    label: 'of',
    type: 'creation',
    description:
      'emit variable amount of values in a sequence and then emits a single complete notification',
    function: `of() {
      this.data = [1, 2, 3, 4];
      const source = of(this.data);
      source.subscribe((data) => {
        this.result = data + 'text';
      });
  }`,
  },
  {
    id: 'from',
    label: 'from',
    type: 'creation',
    description: 'turn an array, promise, or iterable into an observable.',
    function: `from() {
    this.data = [1, 2, 3, 4];
    const source = from(this.data); 
    source.subscribe((value) => {
      this.result = this.result + value + 'text';
    });
  }`,
  },
  {
    id: 'map',
    label: 'map',
    type: 'transformation',
    description:
      'apply projection with each value from source. Will only map person name from person object.',
    function: `map() {
    this.data = this.person;
    this.personObs
      .pipe(map((person: any) => person.name))
      .subscribe((person: any) => {
        this.result = person;
      });
  }`,
  },
  {
    id: 'tap',
    label: 'tap',
    type: 'utility',
    description:
      'transparently perform actions or side-effects, such as logging. (Check console to see the logs)',
    function: `tap() {
    this.data = this.person;
    this.personObs
      .pipe(tap((person: any) => console.log(person.name)))
      .subscribe((person: any) => console.log(person));
  }`,
  },
  {
    id: 'switchMap',
    label: 'switchMap',
    type: 'transformation',
    description:
      'map to observable, complete previous inner observable, emit values. This operator can cancel in-flight network requests! Will request comments and posts from 2 endpoints',
    function: `switchMap() {
    // cancel from one obs and switch to another having access to both

    const posts = this.apiService.getPosts();
    const comments = this.apiService.getComments();

    const combined = posts.pipe(
      switchMap((posts) => {
        return comments.pipe(
          tap((comments) => {
            this.result = { ...comments, ...posts };
          })
        );
      })
    );

    combined.subscribe();
  }`,
  },
  {
    id: 'mergeMap',
    label: 'mergeMap',
    type: 'transformation',
    description:
      'merge map and map generating a new map (flatMap is exactly the same). Map to observable, emit values. Based on Color and Driver, we create the Car object',
    function: `mergeMap() {
    // declare 2 obs
    const carColorObs = of({ color: 'blue' });
    const carDriverObs = of({ driver: 'john' });

    // merge map and map generating a new map (flatMap is exactly the same)
    const carObs: Observable<any> = carColorObs.pipe(
      mergeMap((color) => {
        return carDriverObs.pipe(
          map((driver) => {
            this.data = { ...color, ...driver };
            const car: any = {
              driver: driver,
              color: color,
            };
            return car;
          })
        );
      })
    );

    carObs.subscribe((car) => {
      this.result = { car: car };
    });
  }`,
  },
  {
    id: 'pluck',
    label: 'pluck',
    type: 'transformation',
    description:
      'select property to emit. We pluck the code from the typed key. Type something...',
    function: `pluck() {
    // pick a property from the obs
    this.keyup$ = fromEvent(document, 'keyup');

    this.keyup$
      .pipe(pluck('code'))
      // 'Space', 'Enter'
      .subscribe((data) => {
        this.result = data;
      });
  }`,
  },
  {
    id: 'exhaustMap',
    label: 'exhaustMap',
    type: 'transformation',
    description:
      'map to inner observable, ignore other values until that observable completes',
  },
  {
    id: 'scan',
    label: 'scan',
    type: 'transformation',
    description: 'reduce over time. Sum over time starting with zero',
    function: `scan() {
    const source = of(1, 2, 3);
    this.data = [1, 2, 3];
    // basic scan example, sum over time starting with zero
    const example = source.pipe(scan((acc, curr) => acc + curr, 0));
    // log accumulated values
    // output: 1,3,6
    example.subscribe((val) => {
      this.result = val;
    });
  }`,
  },
  {
    id: 'debounceTime',
    label: 'debounceTime',
    type: 'filtering',
    description:
      'discard emitted values that take less than the specified time between output',
    function: `debounceTime() {
    //used for search bar. Avoid multiple api request
    of([1, 3, 4])
      .pipe(
        debounceTime(50000),
        distinctUntilChanged(),
        tap((data) => console.log(data))
      )
      .subscribe();
  }`,
  },
  {
    id: 'take',
    label: 'take',
    type: 'filtering',
    description:
      'emit provided number of values before completing. We take the first value emitted from an array of streams',
    function: ` take() {
    this.data = [1, 2, 3, 4];
    from(this.data)
      .pipe(take(1))
      .subscribe((value) => (this.result = value));
  }`,
  },
  {
    id: 'takeUntil',
    label: 'takeUntil',
    type: 'filtering',
    description:
      'emit values until provided observable emits. Will emit for every second until timer$ is completed after 5s',
    function: ` takeUntil() {
    //emit value every 1s
    const source = interval(1000);
    //after 5 seconds, emit value
    const timer$ = timer(5000);
    //when timer emits after 5s, complete source
    const example = source.pipe(takeUntil(timer$));
    //output: 0,1,2,3
    const subscribe = example.subscribe((val) => {
      this.result = val;
    });
  }`,
  },
  {
    id: 'takeLast',
    label: 'takeLast',
    type: 'filtering',
    description:
      'emit the last n emitted values before completion. Sum last 2 digits from an array',
    function: `takeLast() {
    this.data = [1, 2, 3, 4];
    from(this.data)
      .pipe(takeLast(2))
      .subscribe((value) => {
        this.result += value;
      });
  }`,
  },
  {
    id: 'takeWhile',
    label: 'takeWhile',
    type: 'filtering',
    description:
      'emit values until provided expression is false. Console log counter until counter < 3',
    function: `takeWhile() {
    let counter = 0;
    const source = interval(1000);
    source.pipe(takeWhile(() => counter < 3)).subscribe(() => {
      counter++;
      this.result = counter;
    });
  }`,
  },
  {
    id: 'first',
    label: 'first',
    type: 'filtering',
    description: 'emit the first value or first to pass provided expression',
    function: `first() {
    this.data = [1, 2, 3, 4];
    from(this.data)
      .pipe(first())
      .subscribe((value) => (this.result = value));
  }`,
  },
  {
    id: 'concat',
    label: 'concat',
    type: 'combination',
    description:
      'subscribe to observables in order as previous completes.  You can think of concat like a line at a ATM, the next transaction (subscription) cannot start until the previous completes!',
    function: `concat() {
    // declare 2 obs
    const carColorObs = of({ color: 'blue' });
    const carDriverObs = of({ driver: 'john' });
    this.data = { color: 'blue', driver: 'john' };
    // its from rxjs not from rxjs/operators
    // it is going to emit one value for each obs in order
    const combined = concat(carColorObs, carDriverObs);

    combined.subscribe((data) => {
      this.result = { ...this.result, ...data };
    });
  }

  forkJoin() {
    const comments = this.apiService.getComments();
    const posts = this.apiService.getPosts();

    // finish all the observables and emit an array with all of them
    const combined = forkJoin(comments, posts);

    combined.subscribe((combined) => {
      this.result = combined;
    });
  }`,
  },
  {
    id: 'forkJoin',
    label: 'forkJoin',
    type: 'combination',
    description:
      'when all observables complete, emit the last emitted value from each. We get comments and post from api request as an array of responses',
    function: `forkJoin() {
    const comments = this.apiService.getComments();
    const posts = this.apiService.getPosts();

    // finish all the observables and emit an array with all of them
    const combined = forkJoin(comments, posts);

    combined.subscribe((combined) => {
      this.result = combined;
    });
  }`,
  },
  {
    id: 'combineLatest',
    label: 'combineLatest',
    type: 'combination',
    description:
      'when any observable emits a value, emit the last emitted value from each.',
    function: `combineLatest() {
    const comments = this.apiService.getComments();
    const posts = this.apiService.getPosts();

    // Not only does forkJoin require all input observables to be completed,
    // but it also returns an observable that produces a single value that is an array of the last values produced by the input observables.In other words,
    // it waits until the last input observable completes, and then produces a single value and completes.

    // In contrast, combineLatest returns an Observable that produces a new value every time the input observables do,
    // once all input observables have produced at least one value.This means it could have infinite values and may not complete.
    // It also means that the input observables don't have to complete before producing a value
    const combined = combineLatest(comments, posts);

    combined.subscribe((combined) => {
      this.result = { ...this.result, combined };
    });
  }`,
  },
  {
    id: 'withLatestFrom',
    label: 'withLatestFrom',
    type: 'combination',
    description:
      'provide the last value from another observable. Useful for caching to avoid api request',
  },
  {
    id: 'share',
    label: 'share',
    type: 'multicasting',
    description:
      'share source among multiple subscribers. We get posts from api. Used to avoid multiple API requests. Remove share operator to check 2 requests were performed',
    function: `share() {
    const request = this.apiService.getPosts().pipe(share());
    this.loading = true;
    request.subscribe(() => (this.loading = false));
    request.subscribe((data) => {
      this.result = data;
    });
  }`,
  },
];

export const types = [
  {
    id: 'creation',
    label: 'creation',
    description:
      'These operators allow the creation of an observable from nearly anything. From generic to specific use-cases you are free, and encouraged, to turn everything into a stream.',
  },
  {
    id: 'filtering',
    label: 'filtering',
    description:
      'In a push based approach, picking and choosing how and when to accept items is important. These operators provide techniques for accepting values from an observable source and dealing with backpressure.',
  },
  {
    id: 'transformation',
    label: 'transformation',
    description:
      'Transforming values as they pass through the operator chain is a common task. These operators provide transformation techniques for nearly any use-case you will encounter.',
  },
  {
    id: 'combination',
    label: 'combination',
    description:
      'The combination operators allow the joining of information from multiple observables. Order, time, and structure of emitted values is the primary variation among these operators.',
  },
  {
    id: 'multicasting',
    label: 'multicasting',
    description:
      'In RxJS observables are cold, or unicast by default. These operators can make an observable hot, or multicast, allowing side-effects to be shared among multiple subscribers.',
  },
  {
    id: 'utility',
    label: 'utility',
    description:
      'From logging, handling notifications, to setting up schedulers, these operators provide helpful utilities in your observable toolkit.',
  },
];
