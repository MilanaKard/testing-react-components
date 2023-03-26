import React, { useState, useEffect } from 'react';
import { Card, CardProps } from '../Card/Card';
import { Loader } from '../Loader/Loader';
import { PopUp } from '../PopUp/PopUp';
import './CardsContainer.scss';

export type Options = {
  name?: string;
  status?: 'alive' | 'dead' | 'unknown' | '';
  species?: string;
  type?: string;
  gender?: 'female' | 'male' | 'genderless' | 'unknown' | '';
  page: number;
};

type CardsContainerProps = {
  options: Options;
  onRequest: (pageCount: number) => void;
};

type Data = {
  info?: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: CardProps['data'][];
};

const CardsContainer = ({ options, onRequest }: CardsContainerProps): JSX.Element => {
  const [data, setData] = useState({ results: [] } as Data);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cardNumber, setCardNumber] = useState(0);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [error, setError] = useState(null as JSX.Element | null);

  useEffect(() => {
    setIsLoaded(false);

    const fetchData = async () => {
      const params = Object.entries(options)
        .map(([key, value]) => (value ? `&${key}=${value}` : ''))
        .reduce((prev, current) => prev + current, '');
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?${params}`);

        const data = await res.json();
        if (data.error) {
          setError(<div>No matching results.</div>);
          setIsLoaded(true);
          onRequest(0);
          return;
        }
        setError(null);
        setData(data);
        setIsLoaded(true);
        onRequest(data.info?.pages);
      } catch {
        setError(<div>Failed to load data.</div>);
        setIsLoaded(true);
        onRequest(0);
      }
    };
    fetchData();
  }, [options]);

  const handleCardClick = (e: React.MouseEvent) => {
    const card = e.currentTarget.closest('.card') as HTMLElement;
    const cardNumber = Number(card.dataset.num);
    setCardNumber(cardNumber);
    setIsPopUpVisible(true);
  };

  return (
    <>
      {!isLoaded ? (
        <Loader />
      ) : (
        error || (
          <>
            <div className="container">
              {data.results.map((el, index) => {
                return (
                  <Card
                    data={el}
                    key={el.id}
                    index={index}
                    onClick={handleCardClick}
                    isDetailed={false}
                  />
                );
              })}
            </div>
          </>
        )
      )}
      <PopUp
        isVisible={isPopUpVisible}
        onClose={() => {
          setIsPopUpVisible(false);
        }}
      >
        {data.results.length && (
          <Card
            data={data.results[cardNumber]}
            onClick={() => null}
            index={cardNumber}
            isDetailed={true}
          />
        )}
      </PopUp>
    </>
  );
};
export { CardsContainer };
