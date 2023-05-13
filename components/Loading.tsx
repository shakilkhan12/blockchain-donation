import React from 'react'
type PropTypes = {
    mt: string;
}
const Loading = ({mt}: PropTypes) => {
  return (
    <span className={`block w-10 h-10 rounded-full border-[3px] border-r-transparent animate-spin transition-all duration-300 border-blue-600 ${mt}`}></span>
  )
}

export default Loading