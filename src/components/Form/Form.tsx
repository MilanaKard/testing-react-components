import './Form.scss';
import React from 'react';
import { FormCardProps } from '../FormCard/FormCard';

interface FormProps {
  onSubmit: (formData: FormCardProps['data']) => void;
}
interface FormState {
  isSubmitActive: boolean | null;
  errors: {
    [key: string]: boolean;
  };
}

class Form extends React.Component<FormProps, FormState> {
  state = {
    errors: {
      isPhotoError: false,
      isTitleError: false,
      isDateError: false,
      isCheckboxError: false,
      isTextError: false,
    },
    isSubmitActive: false,
  };
  title: React.RefObject<HTMLInputElement> | undefined;
  photo: React.RefObject<HTMLInputElement> | undefined;
  date: React.RefObject<HTMLInputElement> | undefined;
  isLike: React.RefObject<HTMLInputElement> | undefined;
  cuisine: React.RefObject<HTMLSelectElement> | undefined;
  isVegetarian: React.RefObject<HTMLInputElement> | undefined;
  isVegan: React.RefObject<HTMLInputElement> | undefined;
  text: React.RefObject<HTMLTextAreaElement> | undefined;

  constructor(props: FormProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.validatePhotoInput = this.validatePhotoInput.bind(this);
    this.validateTitleInput = this.validateTitleInput.bind(this);
    this.validateDateInput = this.validateDateInput.bind(this);
    this.validateCheckbox = this.validateCheckbox.bind(this);
    this.validateTextInput = this.validateTextInput.bind(this);
    this.photo = React.createRef();
    this.title = React.createRef();
    this.date = React.createRef();
    this.isLike = React.createRef();
    this.cuisine = React.createRef();
    this.isVegetarian = React.createRef();
    this.isVegan = React.createRef();
    this.text = React.createRef();
  }

  validatePhotoInput() {
    const files = this.photo?.current?.files as FileList;
    const isError = !files[0];
    this.setState(({ errors }) => ({
      errors: {
        ...errors,
        isPhotoError: isError,
      },
    }));
    return isError;
  }

  validateTitleInput() {
    const isError = !this.title?.current?.value.trim();

    this.setState(({ errors }) => ({
      errors: {
        ...errors,
        isTitleError: isError,
      },
    }));
    return isError;
  }

  validateDateInput() {
    const isError = !this.date?.current?.value;
    this.setState(({ errors }) => ({
      errors: {
        ...errors,
        isDateError: isError,
      },
    }));
    return isError;
  }

  validateCheckbox() {
    const isError =
      !this.isVegetarian?.current?.checked && this.isVegan?.current?.checked ? true : false;
    this.setState(({ errors }) => ({
      errors: {
        ...errors,
        isCheckboxError: isError,
      },
    }));
    return isError;
  }

  validateTextInput() {
    const isError = !this.text?.current?.value.trim();
    this.setState(({ errors }) => ({
      errors: {
        ...errors,
        isTextError: isError,
      },
    }));
    return isError;
  }

  clearForm() {
    if (this.photo?.current) this.photo.current.value = '';
    if (this.title?.current) this.title.current.value = '';
    if (this.date?.current) this.date.current.value = '';
    if (this.isLike?.current) this.isLike.current.checked = true;
    if (this.isVegan?.current) this.isVegan.current.checked = false;
    if (this.isVegetarian?.current) this.isVegetarian.current.checked = false;
    if (this.text?.current) this.text.current.value = '';
    if (this.cuisine?.current) this.cuisine.current.value = 'European';
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isError = [
      this.validatePhotoInput(),
      this.validateTitleInput(),
      this.validateTextInput(),
      this.validateDateInput(),
      this.validateCheckbox(),
    ].includes(true);
    if (isError) {
      return;
    }
    const file = this.photo?.current?.files as FileList;
    const formData: FormCardProps['data'] = {
      id: `${this.title?.current?.value}${Math.floor(Math.random() * 9000) + 1000}`,
      imgUrl: `${file[0] ? URL.createObjectURL(file[0]) : ''}`,
      title: `${this.title?.current?.value.trim()}`,
      text: `${this.text?.current?.value.trim()}`,
      additionalText: `Cuisine: ${this.cuisine?.current?.value}`,
      date: `${this.date?.current?.value}`,
      isVegetarian: this.isVegetarian?.current?.checked,
      isVegan: this.isVegan?.current?.checked,
      isLike: this.isLike?.current?.checked,
      watchCount: 0,
      likeCount: 0,
    };
    this.clearForm();
    this.props.onSubmit(formData);
    this.setState({ isSubmitActive: false });
  }

  componentDidUpdate(prevProps: FormProps, prevState: FormState) {
    if (Object.values(this.state.errors).includes(true) && prevState.isSubmitActive) {
      this.setState({ isSubmitActive: false });
    }
    if (!Object.values(this.state.errors).includes(true) && !prevState.isSubmitActive) {
      this.setState({ isSubmitActive: true });
    }
  }

  render() {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const { errors, isSubmitActive } = this.state;
    return (
      <form className="feedback-form" onSubmit={this.onSubmit}>
        <fieldset>
          <label htmlFor="photo" className="form-label">
            Photo:
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept=".jpg, .jpeg, .png"
            onChange={this.validatePhotoInput}
            onBlur={this.validatePhotoInput}
            ref={this.photo}
          />
          {errors.isPhotoError && <p>Image is required.</p>}
          <label htmlFor="title" className="form-label">
            Dish title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={this.validateTitleInput}
            onBlur={this.validateTitleInput}
            ref={this.title}
          />
          {errors.isTitleError && <p>Title is required.</p>}
          <label htmlFor="date" className="form-label">
            Food order date:
          </label>
          <input
            type="date"
            name="date"
            id="date"
            max={currentDate}
            min="2020-01-01"
            onBlur={this.validateDateInput}
            ref={this.date}
          />
          {errors.isDateError && <p>Date is required.</p>}
          <div>
            <p>Do you like the dish?</p>
            <label htmlFor="like">Yes</label>
            <input type="radio" name="like" className="radio" defaultChecked ref={this.isLike} />

            <label htmlFor="like">No</label>
            <input type="radio" name="like" className="radio" />
          </div>
          <label htmlFor="select-cuisine" className="form-label">
            Select cuisine:
          </label>
          <select name="select-cuisine" id="select-cuisine" ref={this.cuisine}>
            <option value="European">European</option>
            <option value="Asian">Asian</option>
            <option value="American">American</option>
            <option value="African">African</option>
            <option value="Other">Other</option>
          </select>
          <div>
            <label htmlFor="vegetarian" className="form-label checkbox-label">
              Is vegetarian
            </label>
            <input
              type="checkbox"
              name="vegetarian"
              id="vegetarian"
              className="form-checkbox"
              onClick={this.validateCheckbox}
              ref={this.isVegetarian}
            />
          </div>
          <div>
            <label htmlFor="vegan" className="form-label checkbox-label">
              Is vegan
            </label>
            <input
              type="checkbox"
              name="vegan"
              id="vegan"
              className="form-checkbox"
              onChange={this.validateCheckbox}
              ref={this.isVegan}
            />

            {errors.isCheckboxError && <p>If the dish is vegan, it might be vegetarian as well.</p>}
          </div>
          <label htmlFor="comment" className="form-label">
            Comment:
          </label>
          <textarea
            cols={40}
            rows={10}
            name="comment"
            id="comment"
            className="form-comment"
            onChange={this.validateTextInput}
            onBlur={this.validateTextInput}
            ref={this.text}
          ></textarea>
          {errors.isTextError && <p>Comment is required.</p>}
          <input
            type="submit"
            value="Submit"
            className={`submit-btn ${isSubmitActive ? 'active' : ''}`}
          />
        </fieldset>
      </form>
    );
  }
}

export { Form };
