import React from 'react';
type MultiStepContextType = {
    stepIndex: number;
    setStepIndex: React.Dispatch<React.SetStateAction<number>>;
    totalSteps: number;
    watchedStepValues: Record<string, any>;
    allWatchedSteps: Record<string, any>;
    setAllWatchedSteps: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    goNext: () => void;
    goPrev: () => void;
};
type MultiStepProviderProps = {
    children: React.ReactNode;
    stepIndex: number;
    setStepIndex: React.Dispatch<React.SetStateAction<number>>;
    totalSteps: number;
    watchedStepValues: Record<string, any>;
    allWatchedSteps: Record<string, any>;
    setAllWatchedSteps: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};
export declare const MultiStepProvider: ({ children, stepIndex, setStepIndex, totalSteps, watchedStepValues, allWatchedSteps, setAllWatchedSteps, }: MultiStepProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare const useMultiStepContext: () => MultiStepContextType;
export {};
