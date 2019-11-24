import React, { useRef, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import formatTime from '../lib/formatTime';

export default function Progressbar({ currentTime, duration, setCurrentTime }) {
  const progress = useRef();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);

  const totalWidth = progress.current ? progress.current.offsetWidth : 100;
  const width = duration ? (currentTime / duration) * 100 : 50;
  const tooltipTimeS = (tooltipPosition / totalWidth) * duration;
  const tooltipTime = formatTime(tooltipTimeS);

  {/* eslint-disable */ }
  return (<Fragment>
    <div
      className="progress"
      onClick={() => setCurrentTime(tooltipTimeS)}
      onMouseMove={(e) => setTooltipPosition(e.nativeEvent.offsetX)}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      ref={progress}
    >
      {/* eslint-enable */}

        <div className="progress__time" style={{ width: `${width}%` }} />
      </div>
      <div
        className="player__tooltip"
        style={{
          left: `${tooltipPosition}px`,
          opacity: `${tooltipVisible ? '1' : '0'}`,
        }}
      >
        {tooltipTime}
      </div>
    </Fragment>
  );
}

Progressbar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  setCurrentTime: PropTypes.func,
};
