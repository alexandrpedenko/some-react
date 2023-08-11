import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

interface Props {
  component: ReactNode
}

const UnAuthorized = ({ component }: Props) => {
  const { isAuth } = useAppSelector((state: RootState) => state.auth);

  if (isAuth) {
    return <Navigate to='/' />
  }

  return component;
}

export default UnAuthorized