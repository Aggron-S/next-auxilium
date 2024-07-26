interface SignUpFormFields {
  first_name: string;
  last_name: string;
  department: string;
  email_address: string;
  password: string;
  re_enter_password: string;
}

const formFieldData = {
  first_name: "fname",
  last_name: "lname",
  department: "department",
  email_address: "email",
  password: "pass",
  re_enter_password: "repass",
};

const InputField = ({ 
  fieldName, 
  inputType = "text"
} : {
  fieldName: keyof SignUpFormFields,
  inputType?: React.HTMLInputTypeAttribute
}) => {
  const formattedPlaceholder = `${fieldName}`
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={fieldName}>
        {formattedPlaceholder}
        <span className="text-[#dc3545] text-md font-bold"> * </span>  
      </label>
      <input
        type={inputType}
        className="shadow-xl opacity-80 bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none"
        placeholder={formattedPlaceholder}
        id={fieldName}
        name={formFieldData[fieldName]}
        required
        tabIndex={-1}
      />
    </div>
  );
}

export default InputField;
