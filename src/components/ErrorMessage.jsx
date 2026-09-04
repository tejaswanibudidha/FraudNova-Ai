import React from 'react'

export default function ErrorMessage({message}){
  return (
    <div className="card border-l-4 border-fraudred">
      <div className="text-sm text-fraudred font-semibold">Error</div>
      <div className="mt-2 text-sm text-gray-300">{message}</div>
    </div>
  )
}
