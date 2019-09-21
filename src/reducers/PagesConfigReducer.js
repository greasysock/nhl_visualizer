import {NEXT_PAGE, SET_PAGE, SET_PAGE_AMOUNT} from '../actions/types'

export default (page={currentPage:0,totalPages:0}, action) => {
    switch(action.type){
        case NEXT_PAGE:
            return {...page, currentPage: (page.currentPage+1)%page.totalPages}
        case SET_PAGE_AMOUNT:
            return {...page, totalPages: action.payload}
        case SET_PAGE:
            return {...page, currentPage: action.payload}
        default:
            return page
    }
}