import { v4 as uuidv4 } from 'uuid';

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCreateHeroMutation } from '../../api/apiSlice';
import { selectAllFilters } from '../heroesFilters/filtersSlice';

import store from '../../store';

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState('');
  const [heroDescription, setHeroDescription] = useState('');
  const [heroElement, setHeroElement] = useState('');

  const [createHero, { isLoading, isSuccess, isError, error }] =
    useCreateHeroMutation();

  const { filtersLoadingStatus } = useSelector((state) => state.filters);
  const filters = selectAllFilters(store.getState());

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const newHero = {
      id: uuidv4(),
      name: heroName,
      description: heroDescription,
      element: heroElement,
    };

    createHero(newHero).unwrap();

    setHeroName('');
    setHeroDescription('');
    setHeroElement('');

    inputRef.current.focus();
  };

  const renderElements = (filters, status) => {
    if (status === 'loading') {
      return <option>Loading elements...</option>;
    } else if (status === 'error') {
      return <option>Loading error...</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map((item) => {
        const { name, label } = item;

        // eslint-disable-next-line
        if (name === 'all') return;

        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form className='border p-4 shadow-lg rounded' onSubmit={handleOnSubmit}>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label fs-4'>
          The name of the new hero
        </label>
        <input
          required
          autoFocus
          autoComplete='off'
          ref={inputRef}
          type='text'
          name='name'
          className='form-control'
          id='name'
          placeholder='What is my name?'
          value={heroName}
          onChange={(event) => setHeroName(event.target.value)}
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='text' className='form-label fs-4'>
          Description
        </label>
        <textarea
          required
          name='text'
          className='form-control'
          id='text'
          placeholder='What can I do?'
          style={{ height: '130px' }}
          value={heroDescription}
          onChange={(event) => setHeroDescription(event.target.value)}
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='element' className='form-label'>
          Choose a hero element
        </label>
        <select
          required
          className='form-select'
          id='element'
          name='element'
          value={heroElement}
          onChange={(event) => setHeroElement(event.target.value)}
        >
          <option value=''>I own the element of...</option>
          {renderElements(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type='submit' className='btn btn-primary'>
        Create
      </button>
    </form>
  );
};

export default HeroesAddForm;
