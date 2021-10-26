import { ReactNode, MouseEvent } from "react";
import styles from "./Button.module.css";

type Props = {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ children, disabled = false, onClick = () => {} }: Props) => (
  <button className={styles.button} disabled={disabled} onClick={onClick}>
    {children}
  </button>
);

export default Button;
