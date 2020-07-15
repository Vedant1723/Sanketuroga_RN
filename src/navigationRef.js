// RootNavigation.js

import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

// add other navigation functions that you need and export them

// import { NavigationAction } from '@react-navigation/native';

// let navigator;

// export const setNavigator = (nav) => {
//   navigator = nav;
// };

// export const navigate = (routeName, params) => {
//   navigator.dispatch(
//     NavigationAction.navigate({
//       routeName,
//       params,
//     }),
//   );
// };
