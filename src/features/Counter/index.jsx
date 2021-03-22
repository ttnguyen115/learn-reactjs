import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease } from './counterSlide';

// CounterFeature.propTypes = {};

function CounterFeature(props) {
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    const handleIncreaseClick = () => {
        const action = increase();
        dispatch(action);
    }
    
    const handleDecreaseClick = () => {
        const action = decrease();
        dispatch(action);
    }

    return (
        <div>
            Counter: {counter}

            <div>
                <button onClick={handleIncreaseClick}>Increase</button>
                <button onClick={handleDecreaseClick}>Decrease</button>
            </div>
        </div>
    );
}

export default CounterFeature;