import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
  const {
    data: heroes = [],
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHeroesQuery();

  const [deleteHero, { status, endpointName }] = useDeleteHeroMutation();

  const activeFilter = useSelector((state) => state.filters.activeFilter);

  const filteredHeroes = useMemo(() => {
    const filteredHeroes = [...heroes];

    if (activeFilter === 'all') {
      return filteredHeroes;
    } else {
      return filteredHeroes.filter((item) => item.element === activeFilter);
    }
  }, [heroes, activeFilter]);

  const onDelete = useCallback(
    (id) => {
      deleteHero(id);
    },
    // eslint-disable-next-line
    []
  );

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    return <h5 className='text-center mt-5'>Loading error...</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames='hero'>
          <h5 className='text-center mt-5'>
            There are no heroes in the list...
          </h5>
        </CSSTransition>
      );
    }

    return arr.map((item) => {
      const { id, ...props } = item;
      return (
        <CSSTransition key={id} timeout={500} classNames='hero'>
          <HeroesListItem onDelete={() => onDelete(id)} {...props} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);

  return <TransitionGroup component='ul'>{elements}</TransitionGroup>;
};

export default HeroesList;
