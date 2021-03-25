import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {

  const [values, setValues] = useState({});
  const [errors , setErrors] = useState({mobileNo :true});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {

    console.log("in user Effects use form")
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));

  };
  const setEditValues = (data1) => {
    setValues(values => ({ ...values, ...data1}));

  };

  return {
    handleChange,
    handleSubmit,
    setEditValues,
    values,
    errors,
  }
};

export default useForm;