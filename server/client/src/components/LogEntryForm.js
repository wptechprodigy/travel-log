import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from '../API';

function LogEntryForm({ location, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    try {
      setIsLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createLogEntry(data);
      onClose();
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
      {error && <h3 className="error">{error}</h3>}
      <label htmlFor="title">Title</label>
      <input
        className="inputs"
        ref={register({ required: true })}
        name="title"
        required
      />
      {errors.title && <span>This field is required</span>}

      <label htmlFor="description">Description</label>
      <input className="inputs" ref={register} name="description" />
      <label htmlFor="comments">Comments</label>
      <textarea className="inputs" ref={register} rows="4" name="comments" />
      <label htmlFor="image">Image</label>
      <input className="inputs" ref={register} name="image" type="url" />
      <label htmlFor="visitedDate">Visit Date</label>
      <input
        className="inputs"
        ref={register({ required: true })}
        name="visitedDate"
        type="date"
      />
      <button className="btn" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Create Entry'}
      </button>
    </form>
  );
}

export default LogEntryForm;
