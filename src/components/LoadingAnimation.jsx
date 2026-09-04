import React from 'react'

export default function LoadingAnimation({label='Loading...'}){
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-full border-4 border-t-cyan-400 border-white/10 animate-spin"></div>
      <div className="text-sm text-gray-300">{label}</div>
    </div>
  )
}
