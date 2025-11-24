"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, ExternalLink, Check } from "lucide-react";
import { useState, useEffect } from "react";
import QRCode from "qrcode";
import Link from "next/link";
import { toast } from "sonner";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    slug: string;
}

export function SuccessModal({ isOpen, onClose, slug }: SuccessModalProps) {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
    const [copied, setCopied] = useState(false);

    // Construct the full URL
    // In development, it might be localhost. In prod, it's the domain.
    // We'll use window.location.origin if available, or a placeholder.
    const [origin, setOrigin] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setOrigin(window.location.origin);
        }
    }, []);

    const shareUrl = `${origin}/${slug}`;

    useEffect(() => {
        if (slug && origin) {
            QRCode.toDataURL(shareUrl)
                .then((url) => {
                    setQrCodeUrl(url);
                })
                .catch((err) => {
                    console.error("Error generating QR code", err);
                });
        }
    }, [slug, origin, shareUrl]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            toast.success("Link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy link");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Paste Created Successfully!</DialogTitle>
                    <DialogDescription>
                        Your paste is ready to share.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4 py-4">
                    {qrCodeUrl && (
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                        </div>
                    )}

                    <div className="flex w-full items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                defaultValue={shareUrl}
                                readOnly
                                className="h-9"
                            />
                        </div>
                        <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
                            <span className="sr-only">Copy</span>
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
                <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-2">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        className="w-full sm:w-auto"
                    >
                        Close
                    </Button>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Link href={`/${slug}`} passHref className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto">
                                View Paste <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
