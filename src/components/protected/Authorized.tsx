import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

interface Props {
  component: ReactNode
}

const Authorized = ({ component }: Props) => {
  const { isAuth } = useAppSelector((state: RootState) => state.auth);

  if (!isAuth) {
    return <Navigate to='/sign-in' />
  }

  return component;
}

export default Authorized