import React, { useState } from 'react';
import { Form, Inputs } from '../Form/Form';
import { PopUp } from '../PopUp/PopUp';
import { FormCard } from '../FormCard/FormCard';
import '../CardsContainer/CardsContainer.scss';

const FormPage = (): JSX.Element => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [formData, setFormData] = useState([] as Inputs[]);
  const onSubmit = (formData: Inputs) => {
    setFormData((state: Inputs[]) => [...state, formData]);
    setIsPopUpVisible(true);
  };

  return (
    <>
      <h1>Leave feedback</h1>
      <Form onSubmit={onSubmit} />
      <div className="container">
        {formData.map((el) => (
          <FormCard data={el} key={el.id} />
        ))}
      </div>
      <PopUp
        isVisible={isPopUpVisible}
        onClose={() => {
          setIsPopUpVisible(false);
        }}
      >
        <p>Your feedback is saved. Thank you.</p>
      </PopUp>
    </>
  );
};

export { FormPage };
