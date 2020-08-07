import { ResolveStart } from '@angular/router';

export interface Roles {
  admin?: Boolean;
  guest?: Boolean;
  user?: Boolean;
  editor?: Boolean;
}

export interface User {
  uid?: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
  tel?: number;
  tasks?: any;
  rol?: Roles;
}