import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form"

interface TextInputFieldProps {
    name: string,                              // Name attribute for the input field
    label: string,                             // Label text for the input field
    register: UseFormRegister<any>,            // Form register function from react-hook-form
    registerOptions?: RegisterOptions,         // Options for registration (optional)
    error?: FieldError,                        // Validation error object (optional)
    [x: string]: any,                          // Additional props to spread onto the Form.Control
}

const TextInputField = ({ name, label, register, registerOptions, error, ...props }: TextInputFieldProps) => {
    return (
        <Form.Group className="mb-3" controlId={name + "-input"}>
            <Form.Label>{label}</Form.Label>                      {/* Label for the input field */}
            <Form.Control
                {...props}                                        {/* Spread additional props onto Form.Control */}
                {...register(name, registerOptions)}              {/* Register input field with react-hook-form */}
                isInvalid={!!error}                               {/* Mark input as invalid if error exists */}
            />
            <Form.Control.Feedback type="invalid">
                {error?.message}                                  {/* Display error message if validation fails */}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default TextInputField;
