import {NEXT_PAGE, SET_PAGE, SET_PAGE_AMOUNT, SET_PAGE_NAME} from '../actions/types'

export default (page={currentPage:0,totalPages:0, pageNames:{0:'home'}}, action) => {
    switch(action.type){
        case NEXT_PAGE:
            return {...page, currentPage: (page.currentPage+1)%page.totalPages}
        case SET_PAGE_AMOUNT:
            return {...page, totalPages: action.payload}
        case SET_PAGE:
            return {...page, currentPage: action.payload}
        case SET_PAGE_NAME:
            page.pageNames[action.payload.pageId] = action.payload.name
            return {...page}
        default:
            return page
    }
}