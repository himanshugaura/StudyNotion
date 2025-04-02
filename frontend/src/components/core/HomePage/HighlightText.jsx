import React from 'react'

const HighlightText = (props) => {
  return (
    <span className='bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent'>{props.text}</span>
  )
}

export default HighlightText