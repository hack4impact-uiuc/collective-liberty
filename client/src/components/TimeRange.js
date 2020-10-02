// @flow

import React, { useState } from 'react';
import './../styles/TimeRange.css';

const TimeRange = () => {
    const [range, setRange] = useState(50);

    return (
        <div class="slidecontainer">
            <input type="range" min="1" max="100" class="slider" id="myRange"/>
        </div>
    );
};

export default TimeRange;