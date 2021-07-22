import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_BOX_TO_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const BoxForm = ({ customerId }) => {
    const [box, setBox] = useState('');
  
    const [addBox, { error }] = useMutation(ADD_BOX_TO_USER,);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const data = await addBox({
          variables: { customerId, box },
        });
  
        setBox('');
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <div>
        <h4>Buy a box.</h4>
  
        {Auth.loggedIn() ? (
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <input
                placeholder="Buy a box"
                value={box}
                className="form-input w-100"
                onChange={(event) => setBox(event.target.value)}
              />
            </div>
  
            <div className="col-12 col-lg-3">
              <button className="btn btn-info btn-block py-3" type="submit">
                Buy a box
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        ) : (
          <p>
            You need to be logged in to buy a box. Please{' '}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
      </div>
    );
  };


export default BoxForm;
