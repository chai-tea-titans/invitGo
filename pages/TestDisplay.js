import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTestAsync, selectTest } from "../features/testSlice";

const testDisplay = () => {
  const dispatch = useDispatch();
  const test = useSelector(selectTest);

  useEffect(() => {
    dispatch(fetchTestAsync());
  }, []);

  return (
    <div>
      {test.map(event => (
        <div key={event.id}>
          <h2>{event.day}</h2>
          <p>{event.month}</p>
          <p>{event.years}</p>
        </div>
      ))}
    </div>
  );
};
export default testDisplay;
