import { db } from "./firebase";
import {
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    increment,
    Timestamp,
    query,
    where,
    getDocs,
} from "firebase/firestore";

export interface Paste {
    slug: string;
    content: string;
    language: string;
    views: number;
    createdAt: Timestamp;
}

// Generate a random 6-character slug
const generateSlug = (): string => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

// Check if a slug exists
export const checkSlug = async (slug: string): Promise<boolean> => {
    const docRef = doc(db, "pastes", slug);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
};

// Save a new paste
export const savePaste = async (
    content: string,
    language: string,
    customSlug?: string
): Promise<string> => {
    let slug = customSlug?.trim();

    if (slug) {
        const exists = await checkSlug(slug);
        if (exists) {
            throw new Error("Slug already exists");
        }
    } else {
        // Generate unique slug
        let isUnique = false;
        while (!isUnique) {
            slug = generateSlug();
            const exists = await checkSlug(slug);
            if (!exists) isUnique = true;
        }
    }

    if (!slug) throw new Error("Failed to generate slug");

    const paste: Paste = {
        slug,
        content,
        language,
        views: 0,
        createdAt: Timestamp.now(),
    };

    await setDoc(doc(db, "pastes", slug), paste);
    return slug;
};

// Get a paste by slug
export const getPaste = async (slug: string): Promise<Paste | null> => {
    const docRef = doc(db, "pastes", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as Paste;
    } else {
        return null;
    }
};

// Increment view count
export const incrementView = async (slug: string): Promise<void> => {
    const docRef = doc(db, "pastes", slug);
    await updateDoc(docRef, {
        views: increment(1),
    });
};
