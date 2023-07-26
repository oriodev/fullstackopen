const initialState = ''

export const filterAnecdotes = filter => {
    return {
      type: 'SET_FILTER',
      payload: { filter }
    }
  }

export const filterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_FILTER':
      // console.log('filterreducer flag')
      // console.log(action.payload)
      return action.payload
    default: return state
  }
}