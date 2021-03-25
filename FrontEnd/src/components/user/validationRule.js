export default function validate(values) {
    let errors = {};
    console.log("values = ", values)

    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    
    return errors;
};
