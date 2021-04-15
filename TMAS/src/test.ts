// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

//http://localhost:4200/confirmemail?userid=513a95d8-75d0-44f7-ee90-08d8fe77ec1f&token=Q2ZESjhKWVorbjNDa1ZaRXRPSkRic2pRcFFaNkl5SzRyYnJGNjJDVUYxYU96cDFQVTlxdjZNOXhYSFNsU3dTZWxaOXpRRkdHSzQxbzltSEE0dWRBaUwySTZ1MFc4dURaT2ZOQ3ZUaE5DWUZyKzFYRDhTUCtFVmxVbEFHaVg2YnVwbVdHOERUT0RMUHREcGk3dUIwcGZMRU43MGRtSFA4ZHgxR1VsdUp2NTlJU0pqNU1BNHF0S0tyYWpVTFJJd0tFWG1VNC9HTnc0UWk5NzVwcjBrcldRdG95RzdTOHJMdkxRL2NncWQ0cUFwVVEvQVBTcEc2c2FYN2pLTCtvRk1DYjdGZWRMZz09
