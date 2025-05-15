import { useContext } from 'react';
import { TrainsContext } from '../context/trainsContext';

export const useTrains = () => {
  const context = useContext(TrainsContext);
  if (!context) {
    throw new Error('useTrains must be used within a TrainsProvider');
  }
  return context;
};
