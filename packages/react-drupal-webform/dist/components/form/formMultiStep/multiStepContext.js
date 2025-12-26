import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
const MultiStepContext = createContext(undefined);
export const MultiStepProvider = ({ children, stepIndex, setStepIndex, totalSteps, watchedStepValues, allWatchedSteps, setAllWatchedSteps, }) => {
    const goNext = () => {
        setAllWatchedSteps((prev) => ({ ...prev, ...watchedStepValues })); // ⚡ ici on fusionne
        setStepIndex((prev) => prev + 1);
    };
    const goPrev = () => {
        setStepIndex((prev) => Math.max(prev - 1, 0));
    };
    return (_jsx(MultiStepContext.Provider, { value: {
            stepIndex,
            setStepIndex,
            totalSteps,
            watchedStepValues,
            allWatchedSteps, // ⚡ exposé
            setAllWatchedSteps, // ⚡ exposé
            goNext,
            goPrev,
        }, children: children }));
};
export const useMultiStepContext = () => {
    const ctx = useContext(MultiStepContext);
    if (!ctx)
        throw new Error('useMultiStepContext must be used within MultiStepProvider');
    return ctx;
};
