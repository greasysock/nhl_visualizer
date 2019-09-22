import {SET_PAGE, NEXT_PAGE, SET_PAGE_AMOUNT, SET_PAGE_NAME} from './types'

export const nextPage = () => {
    return {type: NEXT_PAGE}
}

export const setPage = (pageIndex) => {
    return {type: SET_PAGE, payload: pageIndex}
}

export const setPageAmount = pages => {
    return {type: SET_PAGE_AMOUNT, payload: pages}
}

export const setPageName = (name, pageId) => {
    return {type: SET_PAGE_NAME, payload: {name, pageId}}
}