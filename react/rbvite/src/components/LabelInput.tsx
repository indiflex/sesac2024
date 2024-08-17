import { ChangeEvent, useId } from 'react';

type Props = {
  label: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeHolder?: string;
};

export default function LabelInput({
  label,
  type = 'text',
  onChange = () => {},
  className = '',
  placeHolder = `${label}...`,
}: Props) {
  const id = useId();

  return (
    <>
      <label htmlFor={id}>
        {label}:
        <input
          type={type}
          id={id}
          onChange={onChange}
          className={`${className}`}
          placeholder={placeHolder}
        />
      </label>
    </>
  );
}
