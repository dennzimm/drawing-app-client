import { RouteProps } from 'react-router-dom';
import Drawings from '..';

const routes: RouteProps[] = [
  {
    path: '/drawings',
    component: Drawings,
  },
];

export default {
  routes,
};
