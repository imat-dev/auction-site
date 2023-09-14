import { RefObject, useState } from "react";

const useInput = ( validateValue: (value: string) => boolean ) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validateValue(enteredValue);
    const inputHasError = !isValid && isTouched;

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredValue(event.target.value);
    }

    const inputBlurHandler = () => {
        setIsTouched(true);
    }

    const resetInput = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return {
        enteredValue: enteredValue,
        isValid : isValid,
        inputHasError: inputHasError,
        inputChangeHandler,
        inputBlurHandler,
        resetInput
    }
};

export default useInput;
