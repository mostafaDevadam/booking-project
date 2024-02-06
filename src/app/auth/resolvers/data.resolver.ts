import { ResolveFn } from '@angular/router';

export const DataResolver: ResolveFn<boolean> = (route, state) => {
  console.log("resolver data: ", route, state)
  return true;
};
