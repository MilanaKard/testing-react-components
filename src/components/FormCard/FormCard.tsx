import './FormCard.scss';

export type FormCardProps = {
  data: {
    id: string;
    imgUrl: string;
    title: string;
    text: string;
    cuisine: string;
    watchCount?: number;
    likeCount?: number;
    date?: string;
    isLike?: boolean;
    isVegan?: boolean;
    isVegetarian?: boolean;
    [index: string]: string | boolean | number | FileList | undefined;
  };
};

export const FormCard = ({ data }: FormCardProps): JSX.Element => {
  const {
    imgUrl,
    title,
    text,
    cuisine,
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
        <p className="card-additional">Cuisine: {cuisine}</p>
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
          <div className="like-count">{likeCount || 0}</div>
        </div>
        <div>
          <div className="eye-img" />
          <div className="watch-count">{watchCount || 0}</div>
        </div>
      </div>
    </div>
  );
};
