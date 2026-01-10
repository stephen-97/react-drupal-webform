import React from 'react';
type TMultiStepContextType = {
    stepIndex: number;
    setStepIndex: React.Dispatch<React.SetStateAction<number>>;
    totalSteps: number;
    totalVisibleSteps: number;
    watchedStepValues: Record<string, any>;
    allWatchedSteps: Record<string, any>;
    elementsSource: Record<string, any>;
    setAllWatchedSteps: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    currentStepKey: string;
    goNext: () => void;
    goPrev: () => void;
};
type TMultiStepProviderProps = {
    children: React.ReactNode;
    stepIndex: number;
    setStepIndex: React.Dispatch<React.SetStateAction<number>>;
    totalSteps: number;
    totalVisibleSteps: number;
    watchedStepValues: Record<string, any>;
    allWatchedSteps: Record<string, any>;
    currentStepKey: string;
    setAllWatchedSteps: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    elementsSource: Record<string, any>;
};
export declare const MultiStepProvider: ({ children, stepIndex, setStepIndex, totalSteps, totalVisibleSteps, watchedStepValues, allWatchedSteps, setAllWatchedSteps, currentStepKey, elementsSource, }: TMultiStepProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare const useMultiStepContext: () => TMultiStepContextType;
export {};
