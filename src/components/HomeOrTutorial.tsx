import React from 'react';
import { Redirect } from 'react-router';
import { useStoreState } from '../store/hooks';

const HomeOrTutorial: React.FC = () => {
  const hasSeenTutorial = useStoreState((state) => state.user.hasSeenTutorial);

  return hasSeenTutorial ? (
    <Redirect to="/home" />
  ) : (
    <Redirect to="/tutorial" />
  );
};

export default HomeOrTutorial;
