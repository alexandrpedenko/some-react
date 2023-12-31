import { TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
  id?: string;
  label: string;
  name: string;
  type?: string;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
  size?: 'small' | 'medium';
  multiline?: boolean;
  sx: Record<string, string | number>
}

export const TextInput = (props: Props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      helperText={errorText}
      error={!!errorText}
      {...field}
      {...props}
    />
  );
};
