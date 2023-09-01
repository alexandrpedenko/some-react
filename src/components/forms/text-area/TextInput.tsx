
import { useField } from "formik";

interface Props {
  id?: string;
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  variant: string;
  rows?: number;
  size?: 'small' | 'medium'
  sx: Record<string, string | number>
}

export const TextArea = (props: Props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <Textarea
      helperText={errorText}
      error={!!errorText}
      {...field}
      {...props}
    />
  );
};
