import React from 'react';
import { Form } from '../Form/Form';
import { PopUp } from '../PopUp/PopUp';
import { FormCard, FormCardProps } from '../FormCard/FormCard';
import '../CardsContainer/CardsContainer.scss';

type FormPageState = {
  formData: FormCardProps['data'][] | [];
  isPopUpVisible: boolean;
};

class FormPage extends React.Component<object, FormPageState> {
  constructor(props: object) {
    super(props);
    this.state = { formData: [], isPopUpVisible: false };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formData: FormCardProps['data']) {
    this.setState((prev) => ({
      formData: [...prev.formData, formData],
      isPopUpVisible: true,
    }));
  }

  render() {
    const { isPopUpVisible, formData } = this.state;
    return (
      <>
        <h1>Leave feedback</h1>
        <Form onSubmit={this.onSubmit} />
        <div className="container">
          {formData.map((el) => (
            <FormCard data={el} key={el.id} />
          ))}
        </div>
        <PopUp
          isVisible={isPopUpVisible}
          onClose={() => {
            this.setState({ isPopUpVisible: false });
          }}
        >
          <p>Your feedback is saved. Thank you.</p>
        </PopUp>
      </>
    );
  }
}

export { FormPage };
