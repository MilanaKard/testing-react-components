import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormCard } from '../FormCard';

const cardData = {
  id: '1',
  imgUrl: 'https://images.unsplash.com/photo-1621341258668-b2bf005a9f97',
  title: 'Risotto',
  additionalText: 'Сuisine: Italia',
  text: 'A rice dish cooked with broth until it reaches a creamy consistency. The broth can be derived from meat, fish, or vegetables. Many types of risotto contain butter, onion, white wine, and Parmigiano-Reggiano. It is one of the most common ways of cooking rice in Italy. Saffron was originally used for flavour and its signature yellow colour.',
  likeCount: 100,
  watchCount: 300,
};

test('should render text', () => {
  render(<FormCard data={cardData} />);
  const textElement = screen.getByText(/A rice dish/i);
  const additionaltextElement = screen.getByText(/Сuisine: Italia/i);
  expect(textElement).toBeInTheDocument();
  expect(additionaltextElement).toBeInTheDocument();
});

test('should render title', () => {
  render(<FormCard data={cardData} />);
  const titleElement = screen.getByRole('heading');
  expect(titleElement.textContent).toBe('Risotto');
});

test('should render numbers', () => {
  render(<FormCard data={cardData} />);
  const likeCountElement = screen.getByText('100');
  const watchCountElement = screen.getByText('300');
  expect(likeCountElement).toBeInTheDocument();
  expect(watchCountElement).toBeInTheDocument();
});

test('should render image', () => {
  render(<FormCard data={cardData} />);
  const imageElement = screen.getByTestId('image');
  expect(imageElement.style.backgroundImage).toBe(
    'url(https://images.unsplash.com/photo-1621341258668-b2bf005a9f97)'
  );
});
