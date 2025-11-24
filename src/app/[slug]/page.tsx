"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPaste, incrementView, Paste } from "@/lib/firestore-utils";
import PasteViewer from "@/components/PasteViewer";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ViewPastePage() {
    const params = useParams();
    const slug = params.slug as string;
    const [paste, setPaste] = useState<Paste | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            try {
                const data = await getPaste(slug);
                if (data) {
                    setPaste(data);
                    // Increment view count
                    // We don't await this to not block rendering, or we can.
                    // Also we might want to avoid double counting in strict mode (React 18+ dev mode mounts twice).
                    // For simplicity, we'll just call it. In prod it runs once per mount.
                    incrementView(slug).catch(console.error);
                } else {
                    setError("Paste not found");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load paste");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !paste) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <h2 className="text-2xl font-bold text-destructive">{error || "Paste not found"}</h2>
                <Link href="/">
                    <Button variant="outline">Go Home</Button>
                </Link>
            </div>
        );
    }

    return <PasteViewer paste={paste} />;
}
