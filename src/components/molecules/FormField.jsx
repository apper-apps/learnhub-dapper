import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";

const FormField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error,
  multiline = false,
  rows = 3,
  ...props 
}) => {
  const InputComponent = multiline ? Textarea : Input;

  return (
    <div className="space-y-2">
      <Label className={required ? "after:content-['*'] after:text-red-500 after:ml-1" : ""}>
        {label}
      </Label>
      <InputComponent
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        rows={multiline ? rows : undefined}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;