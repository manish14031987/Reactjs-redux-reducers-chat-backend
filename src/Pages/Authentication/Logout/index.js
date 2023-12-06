import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../actions/userActions";
import { useHistory } from "react-router-dom";

const Index = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    dispatch(userLogout(history));
  }, [dispatch, history]);
  return null;
};

export default Index;
