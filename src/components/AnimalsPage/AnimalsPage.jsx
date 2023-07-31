import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnimalItem from '../Animals/AnimalItem';

// Style
import '../App/App.css';

export default function AnimalsPage() {
  const petfinder = useSelector(store => store.petfinder)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type:"FETCH_API"})
  }, []);

  return (
    <div>
      <header className="App-header">
        <h1 className='available-animal'>Available Animals</h1>
      </header>
      <AnimalItem/>
    </div>
  );
}