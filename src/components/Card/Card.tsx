import React from 'react';
import './Card.scss';

export type CardProps = {
  onClick: (e: React.MouseEvent) => void;
  index: number;
  isDetailed: boolean;
  data: {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: Array<string>;
    url: string;
    created: string;
    [index: string]:
      | string
      | boolean
      | number
      | Array<string>
      | { name: string; url: string }
      | undefined;
  };
};

export const Card = ({ data, onClick, index, isDetailed }: CardProps): JSX.Element => {
  const {
    id,
    name,
    status,
    species,
    type,
    gender,
    origin,
    location,
    image,
    episode,
    url,
    created,
  } = data;

  return (
    <div
      className={`card ${isDetailed ? 'detailed' : 'brief'}`}
      data-testid="card"
      data-num={index}
      onClick={onClick}
    >
      <div className="card-img" data-testid="image" style={{ backgroundImage: `url(${image})` }} />
      <div className="card-info">
        <h2 className="card-title">{name}</h2>
        {isDetailed && (
          <>
            <div className="card-text">
              <p>Species: {species}</p>
              <p>Gender: {gender}</p>
              <p>Status: {status}</p>
              <p>Origin: {origin.name}</p>
              <p>Location: {location.name}</p>
            </div>
            <p className="card-date">{created.slice(0, 10)}</p>
          </>
        )}
      </div>
    </div>
  );
};
