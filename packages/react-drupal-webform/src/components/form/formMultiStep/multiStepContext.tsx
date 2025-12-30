import React, { createContext, useContext } from 'react'

type MultiStepContextType = {
  stepIndex: number
  setStepIndex: React.Dispatch<React.SetStateAction<number>>
  totalSteps: number
  watchedStepValues: Record<string, any>
  allWatchedSteps: Record<string, any>
  setAllWatchedSteps: React.Dispatch<React.SetStateAction<Record<string, any>>> // ⚡ ajouté
  goNext: () => void
  goPrev: () => void
}

const MultiStepContext = createContext<MultiStepContextType | undefined>(
  undefined
)

type MultiStepProviderProps = {
  children: React.ReactNode
  stepIndex: number
  setStepIndex: React.Dispatch<React.SetStateAction<number>>
  totalSteps: number
  watchedStepValues: Record<string, any>
  allWatchedSteps: Record<string, any>
  setAllWatchedSteps: React.Dispatch<React.SetStateAction<Record<string, any>>> // ⚡ ajouté
}

export const MultiStepProvider = ({
  children,
  stepIndex,
  setStepIndex,
  totalSteps,
  watchedStepValues,
  allWatchedSteps,
  setAllWatchedSteps,
}: MultiStepProviderProps) => {
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
        watchedStepValues,
        allWatchedSteps, // ⚡ exposé
        setAllWatchedSteps, // ⚡ exposé
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
