import React, { createContext, useContext } from 'react'

type TMultiStepContextType = {
  stepIndex: number
  setStepIndex: React.Dispatch<React.SetStateAction<number>>
  totalSteps: number
  totalVisibleSteps: number
  watchedStepValues: Record<string, any>
  allWatchedSteps: Record<string, any>
  elementsSource: Record<string, any>
  setAllWatchedSteps: React.Dispatch<React.SetStateAction<Record<string, any>>>
  currentStepKey: string
  goNext: () => void
  goPrev: () => void
}

const MultiStepContext = createContext<TMultiStepContextType | undefined>(
  undefined
)

type TMultiStepProviderProps = {
  children: React.ReactNode
  stepIndex: number
  setStepIndex: React.Dispatch<React.SetStateAction<number>>
  totalSteps: number
  totalVisibleSteps: number
  watchedStepValues: Record<string, any>
  allWatchedSteps: Record<string, any>
  currentStepKey: string
  setAllWatchedSteps: React.Dispatch<React.SetStateAction<Record<string, any>>>
  elementsSource: Record<string, any>
}

export const MultiStepProvider = ({
  children,
  stepIndex,
  setStepIndex,
  totalSteps,
  totalVisibleSteps,
  watchedStepValues,
  allWatchedSteps,
  setAllWatchedSteps,
  currentStepKey,
  elementsSource,
}: TMultiStepProviderProps) => {
  const goNext = () => {
    setAllWatchedSteps((prev) => ({ ...prev, ...watchedStepValues })) // ⚡ ici on fusionne
    setStepIndex((prev) => prev + 1)
  }

  const goPrev = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <MultiStepContext.Provider
      value={{
        stepIndex,
        setStepIndex,
        totalSteps,
        totalVisibleSteps,
        watchedStepValues,
        allWatchedSteps,
        setAllWatchedSteps,
        currentStepKey,
        elementsSource,
        goNext,
        goPrev,
      }}
    >
      {children}
    </MultiStepContext.Provider>
  )
}

export const useMultiStepContext = () => {
  const ctx = useContext(MultiStepContext)
  if (!ctx)
    throw new Error('useMultiStepContext must be used within MultiStepProvider')
  return ctx
}
