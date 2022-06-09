import { AUMENTAR } from "../actions/types"

const initialState = {
    contador : 0
}

export default function reducer(state = initialState, actions){
    switch (actions.type) {
        case AUMENTAR:
            return {
                ...state,
                contador: state.contador + 1
            }
    
        default:
           return state;
    }
}