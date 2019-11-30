/* eslint-disable jsx-a11y/label-has-for */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// TODO Fix all eslint issues

function VolumeBars({ currentVolume, setVolume, length = 10 }) {
  length = Number(length); // eslint-disable-line

  const bars = Array.from({ length }, (_, _i) => {
    const i = _i + 1; // 0 indexed to 1 indexed
    const decimal = i / length;
    const checked = decimal <= currentVolume * 1.0;
    const style = { background: checked ? '#03fff3' : '#e4e4e4' };
    const id = `volume-${i}`;
    const labelText = `Volume Level ${decimal * 100}/100`;

    return (
      <Fragment key={i}>
        <input
          id={id}
          className="sr-only"
          name="volume"
          type="radio"
          value={decimal}
          onChange={e => setVolume(Number(e.target.value))}
        />
        <label htmlFor={id} style={style}>
          <span className="sr-only">{labelText}</span>
        </label>
      </Fragment>
    );
  });

  return <>{bars}</>;
}

VolumeBars.propTypes = {
  currentVolume: PropTypes.number,
  setVolume: PropTypes.func,
  length: PropTypes.number,
};

export default VolumeBars;
