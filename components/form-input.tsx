interface FormInputProps {
  type: string;
  placeholder: string;
  errors: string[];
  required?: boolean;
  name: string;
}

export default function FormInput({
  type,
  placeholder,
  errors = [],
  required,
  name,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg bg-transparent border border-neutral-300 focus:outline-none placeholder:text-neutral-300"
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 text-sm">
          {error}
        </span>
      ))}
    </div>
  );
}
