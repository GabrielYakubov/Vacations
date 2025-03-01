
import { useState } from 'react';



export const useValidation = (validateFunc: (value: any) => boolean, initialValue: any) => {

    const [state, setState] = useState(initialValue);
    const [isValid, setIsValid] = useState<boolean>(validateFunc(state))


}

