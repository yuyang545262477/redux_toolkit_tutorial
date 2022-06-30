import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../app/store";
import {decrement, increment, incrementByAmount, reset} from "./counterSlice";

const Counter = () => {
    const {count} = useSelector((state: ApplicationState) => state.counter);
    const dispatch = useDispatch();
    const [incrementAccount, setIncrementAccount] = useState(0);
    const addValue = Number(incrementAccount) || 0;
    return (
        <section>
            <p>{count}</p>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>

            <input type={"number"}
                   value={incrementAccount}
                   onChange={(e) => setIncrementAccount(Number(e.target.value))}
            />
            <div>
                <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Mount</button>
                <button onClick={() => dispatch(reset())}>Rest All</button>
            </div>
        </section>
    );
};

export default Counter;
