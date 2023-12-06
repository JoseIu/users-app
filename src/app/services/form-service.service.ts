import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormServiceService {
  search = '';
  onlyActive?: boolean;
  sortBy: number = 0;

  constructor() {}
}
