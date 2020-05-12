import {
    GET_LIST, LOAD_LIST, LIST_ERROR,
    ADD_TODO, TODO_ADDED, ADD_ERROR,
    EDIT_TODO, TODO_EDITED, EDIT_ERROR,
    DELETE_TODO, TODO_DELETED, DELETE_ERROR
} from '../actions';
// import { bindActionCreators } from 'redux';

const initialState = {
    isLoading: false,
    task: [
        {
            id: Date.now(),
            category: '',
            title: '',
            description: '',
            completeDate: '',
            complete: 0
        }
    ],
    error: '',
    editing: false
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_LIST:
            return {
                ...state,
                isLoading: true,
                task: []
            }
        case LOAD_LIST:
            return {
                ...state,
                isLoading: false,
                task: action.payload
            }
        case LIST_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        case ADD_TODO:
            return {
                ...state,
                isLoading: true,
                task: []
            }
        case TODO_ADDED:
            return {
                ...state,
                isLoading: false
            }
        case ADD_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        case EDIT_TODO:
            return {
                ...state,
                isLoading: true,
                task: []
            }
        case TODO_EDITED:
            return {
                ...state,
                isLoading: false,

            }
        case EDIT_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        case DELETE_TODO:
            return {
                ...state,
                isLoading: true,
                task: []
            }
        case TODO_DELETED:
            return {
                ...state,
                isLoading: false
            }
        case DELETE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default:
            return state;
    }
}
