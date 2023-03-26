import './FormCard.scss';

export type FormCardProps = {
  data: {
    id: string;
    imgUrl: string;
    title: string;
    text: string;
    additionalText: string;
    watchCount: number;
    likeCount: number;
    date?: string;
    isLike?: boolean;
    isVegan?: boolean;
    isVegetarian?: boolean;
    [index: string]: string | boolean | number | undefined;
  };
};

export const FormCard = ({ data }: FormCardProps): JSX.Element => {
  const {
    imgUrl,
    title,
    text,
    additionalText,
    watchCount,
    likeCount,
    date,
    isLike,
    isVegan,
    isVegetarian,
  } = data;

  return (
    <div
      className={`card-item ${
        isVegan !== undefined ? (isLike ? 'card-like' : 'card-dislike') : ''
      }`}
      data-testid="card"
    >
      <div className="card-img" data-testid="image" style={{ backgroundImage: `url(${imgUrl})` }} />
      <div className="card-info">
        <h2 className="card-title">{title}</h2>
        <p className="card-additional">{additionalText}</p>
        {isVegetarian !== undefined && (
          <div>
            <p className="card-vegetarian">Vegetarian</p>
            <div className={isVegetarian ? 'card-right' : 'card-wrong'}></div>
          </div>
        )}
        {isVegan !== undefined && (
          <div>
            <p className="card-vegan">Vegan</p>
            <div className={isVegan ? 'card-right' : 'card-wrong'}></div>
          </div>
        )}
        <p className="card-text">{text}</p>
        {date && <p className="card-date">{date}</p>}
      </div>
      <div className="statistics">
        <div>
          <div className="heart-img" />
          <div className="like-count">{likeCount}</div>
        </div>
        <div>
          <div className="eye-img" />
          <div className="watch-count">{watchCount}</div>
        </div>
      </div>
    </div>
  );
};
