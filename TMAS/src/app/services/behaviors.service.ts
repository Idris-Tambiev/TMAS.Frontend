import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BehaviorSubjectService {
  searchText = new BehaviorSubject('');
  constructor() {}
}
