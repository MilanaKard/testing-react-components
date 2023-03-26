import React from 'react';
import ReactPaginate from 'react-paginate';
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
};

type CardsContainerProps = {
  options: Options;
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

type CardsContainerState = {
  data: Data;
  isLoaded: boolean;
  cardNumber: number;
  isPopUpVisible: boolean;
};
class CardsContainer extends React.Component<CardsContainerProps, CardsContainerState> {
  page: number;
  error: JSX.Element | null;
  constructor(props: CardsContainerProps) {
    super(props);
    this.state = {
      data: { results: [] },
      isLoaded: false,
      cardNumber: 0,
      isPopUpVisible: false,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.page = 1;
    this.error = null;
  }

  componentDidMount() {
    this.updateData();
  }

  async componentDidUpdate(prevProps: CardsContainerProps) {
    if (this.props.options !== prevProps.options) {
      this.setState({ isLoaded: false });
      this.page = 1;
      await this.updateData();
    }
  }

  async updateData() {
    const params = Object.entries(this.props.options)
      .map(([key, value]) => (value ? `&${key}=${value}` : ''))
      .reduce((prev, current) => prev + current, '');
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${this.page}${params}`
      );

      const data = await res.json();
      if (data.error) {
        this.error = <div>No matching results.</div>;
        this.setState({ isLoaded: true });
        return;
      }
      this.error = null;
      this.setState({ data: data, isLoaded: true });
    } catch {
      this.error = <div>Failed to load data.</div>;
      this.setState({ isLoaded: true });
    }
  }

  handlePageClick(data: { selected: number }) {
    this.page = data.selected + 1;
    this.updateData();
  }

  handleCardClick(e: React.MouseEvent) {
    const card = e.currentTarget.closest('.card') as HTMLElement;
    const cardNumber = Number(card.dataset.num);
    this.setState({ cardNumber: cardNumber, isPopUpVisible: true });
  }

  render() {
    const { data, isLoaded, cardNumber, isPopUpVisible } = this.state;
    return (
      <>
        {!isLoaded ? (
          <Loader />
        ) : (
          this.error || (
            <>
              <div className="container">
                {data.results[0]
                  ? data.results.map((el, index) => {
                      return (
                        <Card
                          data={el}
                          key={el.id}
                          index={index}
                          onClick={this.handleCardClick}
                          isDetailed={false}
                        />
                      );
                    })
                  : ''}
              </div>

              <ReactPaginate
                previousLabel={'prev'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={data.info?.pages || 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'page-active'}
                disabledClassName={'page-disabled'}
              />
            </>
          )
        )}
        <PopUp
          isVisible={isPopUpVisible}
          onClose={() => {
            this.setState({ isPopUpVisible: false });
          }}
        >
          {this.state.data.results.length && (
            <Card
              data={this.state.data.results[cardNumber]}
              onClick={() => null}
              index={cardNumber}
              isDetailed={true}
            />
          )}
        </PopUp>
      </>
    );
  }
}
export { CardsContainer };
