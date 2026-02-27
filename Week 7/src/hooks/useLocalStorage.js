import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to interact with localStorage while syncing React state.
 * Also provides built-in CRUD operations tailored for managing arrays (like products).
 * @param {string} key The localStorage key.
 * @param {any} initialValue The initial value if no data exists.
 */
export function useLocalStorage(key, initialValue) {
    // Helper to safely read from local storage
    const readValue = useCallback(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    }, [initialValue, key]);

    // State to store our value
    const [storedValue, setStoredValue] = useState(readValue);

    // Return a wrapped version of useState's setter function that
    // persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    // Listen to changes across different browser tabs to sync data
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === key && e.newValue) {
                setStoredValue(JSON.parse(e.newValue));
            } else if (e.key === key && !e.newValue) {
                setStoredValue(initialValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [initialValue, key]);

    // --- CRUD Operations tailored for array lists (e.g., Products) --- //

    // Save / Create new product
    const addProduct = (product) => {
        // Automatically generate ID if it doesn't exist
        const newProduct = { ...product, id: product.id || Date.now().toString() };
        setValue((prev) => {
            const list = Array.isArray(prev) ? prev : [];
            return [...list, newProduct];
        });
        return newProduct;
    };

    // Update existing product
    const updateProduct = (id, updatedFields) => {
        setValue((prev) => {
            if (!Array.isArray(prev)) return prev;
            return prev.map((item) =>
                item.id === id ? { ...item, ...updatedFields } : item
            );
        });
    };

    // Delete product
    const removeProduct = (id) => {
        setValue((prev) => {
            if (!Array.isArray(prev)) return prev;
            return prev.filter((item) => item.id !== id);
        });
    };

    // Return tuple matching useState signature, plus the CRUD object
    return [storedValue, setValue, { addProduct, updateProduct, removeProduct }];
}
