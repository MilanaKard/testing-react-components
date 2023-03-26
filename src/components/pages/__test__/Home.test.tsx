import { setupServer } from 'msw/node';
import { DefaultRequestBody, rest } from 'msw';
import { Home } from '../Home';
import { screen, render, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.appendChild(modalRoot);

const server = setupServer(
  rest.get<DefaultRequestBody>('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
    return res(
      ctx.json({
        info: {
          count: 826,
          pages: 42,
          next: 'https://rickandmortyapi.com/api/character/?page=2',
          prev: null,
        },
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: {
              name: 'Earth',
              url: 'https://rickandmortyapi.com/api/location/1',
            },
            location: {
              name: 'Earth',
              url: 'https://rickandmortyapi.com/api/location/20',
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [
              'https://rickandmortyapi.com/api/episode/1',
              'https://rickandmortyapi.com/api/episode/2',
            ],
            url: 'https://rickandmortyapi.com/api/character/1',
            created: '2017-11-04T18:48:46.250Z',
          },
          {
            id: 361,
            name: 'Toxic Rick',
            status: 'Dead',
            species: 'Humanoid',
            type: "Rick's Toxic Side",
            gender: 'Male',
            origin: {
              name: 'Alien Spa',
              url: 'https://rickandmortyapi.com/api/location/64',
            },
            location: {
              name: 'Earth',
              url: 'https://rickandmortyapi.com/api/location/20',
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/361.jpeg',
            episode: ['https://rickandmortyapi.com/api/episode/27'],
            url: 'https://rickandmortyapi.com/api/character/361',
            created: '2018-01-10T18:20:41.703Z',
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('api', () => {
  beforeEach(async () => {
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
  });
  test('should render a card', () => {
    expect(screen.getByText('Toxic Rick')).toBeInTheDocument();
  });
  test('should render all cards', () => {
    const cardElements = screen.getAllByTestId(/card/i);
    expect(cardElements.length).toBe(3);
  });
  test('should show popup after click', () => {
    const popupElement = screen.getByTestId(/popup/i);
    expect(popupElement).not.toBeVisible;
    const cardElement = screen.getAllByTestId(/card/i)[0];
    userEvent.click(cardElement);
    expect(popupElement).toBeVisible;
  });
});

const mockedLocalStorage: Record<string, string> = {};

describe('localStorage', () => {
  jest
    .spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    .mockImplementation((key, value) => {
      mockedLocalStorage[`${key}`] = `${value}`;
    });

  jest
    .spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
    .mockImplementation((key): string | null => mockedLocalStorage[`${key}`]);

  test('should get localStorage', function () {
    mockedLocalStorage.searchValue = 'pizza';
    render(<Home />);
    const inputElement = screen.getByPlaceholderText(/Search.../i) as HTMLInputElement;
    expect(inputElement.value).toBe('pizza');
  });
  test('should set localStorage', () => {
    const { unmount } = render(<Home />);
    const inputElement = screen.getByPlaceholderText(/Search.../i) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'sushi' } });
    unmount();
    expect(localStorage.setItem).toHaveBeenCalledWith('searchValue', 'sushi');
  });
});
