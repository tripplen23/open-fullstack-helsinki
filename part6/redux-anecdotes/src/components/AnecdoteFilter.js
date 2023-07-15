import { setFilter } from "../actions/filterActions";
import { useDispatch } from "react-redux";

const AnecdoteFilter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    event.preventDefault();
    dispatch(setFilter(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default AnecdoteFilter;
