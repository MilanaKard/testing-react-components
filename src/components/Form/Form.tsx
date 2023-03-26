import './Form.scss';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export type Inputs = {
  photo: FileList;
  title: string;
  date: string;
  isLike: boolean;
  cuisine: string;
  isVegetarian: boolean;
  isVegan: boolean;
  text: string;
  id: string;
  imgUrl: string;
};

interface FormProps {
  onSubmit: (formData: Inputs) => void;
}

const Form = ({ onSubmit }: FormProps): JSX.Element => {
  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleForm: SubmitHandler<Inputs> = (data) => {
    data.imgUrl = URL.createObjectURL(data.photo[0]);
    data.id = `${data.title}${Math.floor(Math.random() * 9000) + 1000}`;
    onSubmit(data);
  };

  const validateCheckbox = () => {
    const isVegetarian = getValues('isVegetarian');
    const isVegan = getValues('isVegan');
    if (!isVegetarian && isVegan) {
      return false;
    }
    clearErrors(['isVegan', 'isVegetarian']);
    return true;
  };

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <form
      className="feedback-form"
      onSubmit={handleSubmit(handleForm)}
      onChange={() => setIsSubmitActive(true)}
    >
      <fieldset>
        <label htmlFor="photo" className="form-label">
          Photo:
        </label>
        <input
          type="file"
          id="photo"
          accept=".jpg, .jpeg, .png"
          {...register('photo', { validate: (value) => !!value[0] })}
        />
        {errors.photo && <p>Photo is required.</p>}
        <label htmlFor="title" className="form-label">
          Dish title:
        </label>
        <input type="text" id="title" {...register('title', { required: 'Title is required.' })} />
        {errors.title && <p>{errors.title.message}</p>}
        <label htmlFor="date" className="form-label">
          Food order date:
        </label>
        <input
          type="date"
          id="date"
          max={getCurrentDate()}
          min="2020-01-01"
          {...register('date', { required: 'Date is required.' })}
        />
        {errors.date && <p>{errors.date.message}</p>}
        <div>
          <p>Do you like the dish?</p>
          <label htmlFor="isLike">Yes</label>
          <input type="radio" value={1} className="radio" defaultChecked {...register('isLike')} />

          <label htmlFor="isLike">No</label>
          <input type="radio" value="" className="radio" {...register('isLike')} />
        </div>
        <label htmlFor="cuisine" className="form-label">
          Select cuisine:
        </label>
        <select id="cuisine" {...register('cuisine')}>
          <option value="European">European</option>
          <option value="Asian">Asian</option>
          <option value="American">American</option>
          <option value="African">African</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="isVegetarian" className="form-label checkbox-label">
          Is vegetarian
        </label>
        <input
          type="checkbox"
          id="isVegetarian"
          className="form-checkbox"
          {...register('isVegetarian', {
            validate: validateCheckbox,
          })}
        />

        <label htmlFor="isVegan" className="form-label checkbox-label">
          Is vegan
        </label>

        <input
          type="checkbox"
          id="isVegan"
          className="form-checkbox"
          {...register('isVegan', {
            validate: validateCheckbox,
          })}
        />
        {(errors.isVegetarian || errors.isVegan || false) && (
          <p>If the dish is vegan it might be vegetarian as well.</p>
        )}
        <label htmlFor="text" className="form-label">
          Comment:
        </label>
        <textarea
          cols={40}
          rows={10}
          id="text"
          className="form-comment"
          {...register('text', { required: 'Comment is required.' })}
        ></textarea>
        <input
          type="submit"
          value="Submit"
          className={`submit-btn ${
            isSubmitActive && Object.keys(errors).length === 0 ? 'active' : ''
          }`}
        />
        {errors.text && <p>{errors.text.message}</p>}
      </fieldset>
    </form>
  );
};

export { Form };
