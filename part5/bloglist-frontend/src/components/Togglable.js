import React from 'react';
import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  // TODO: On/Off the visibility of the login (toggle)
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // TODO: To make its toggleVisibility function available of the component
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      {/*TODO: UI When visible = false*/}
      <div style={hideWhenVisible}>
        <button className='new-blog-btn' onClick={toggleVisibility}>
          {props.buttonLable}
        </button>
      </div>
      {/*TODO: UI When visible = true*/}
      <div style={showWhenVisible}>
        {props.children}
        <button className='new-blog-btn' onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
