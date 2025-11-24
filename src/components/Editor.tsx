"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { savePaste } from "@/lib/firestore-utils";
import { SuccessModal } from "./SuccessModal";
import { toast } from "sonner";

const LANGUAGES = [
    { value: "plaintext", label: "Plain Text" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "css", label: "CSS" },
    { value: "html", label: "HTML" },
    { value: "json", label: "JSON" },
    { value: "markdown", label: "Markdown" },
    { value: "sql", label: "SQL" },
    { value: "bash", label: "Bash" },
    { value: "yaml", label: "YAML" },
    { value: "dockerfile", label: "Dockerfile" },
];

export default function Editor() {
    const [content, setContent] = useState("");
    const [language, setLanguage] = useState("plaintext");
    const [customSlug, setCustomSlug] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [successSlug, setSuccessSlug] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = async () => {
        if (!content.trim()) {
            toast.error("Paste content cannot be empty");
            return;
        }

        setIsSaving(true);
        try {
            const slug = await savePaste(content, language, customSlug || undefined);
            setSuccessSlug(slug);
            setIsModalOpen(true);
        } catch (error: any) {
            console.error(error);
            if (error.message === "Slug already exists") {
                toast.error("Custom URL already taken. Please try another.");
            } else {
                toast.error("Failed to save paste. Please try again.");
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">New Paste</h1>
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                            {LANGUAGES.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value}>
                                    {lang.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Input
                        placeholder="Custom Slug (optional)"
                        value={customSlug}
                        onChange={(e) => setCustomSlug(e.target.value)}
                        className="w-full sm:w-[200px]"
                        maxLength={20}
                    />

                    <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Paste
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <Card className="min-h-[500px] flex flex-col">
                {language === "markdown" ? (
                    <Tabs defaultValue="write" className="w-full flex-1 flex flex-col">
                        <div className="px-6 pt-4">
                            <TabsList>
                                <TabsTrigger value="write">Write</TabsTrigger>
                                <TabsTrigger value="preview">Preview</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="write" className="flex-1 p-0 m-0 h-full">
                            <Textarea
                                placeholder="Paste your code or text here..."
                                className="min-h-[500px] resize-none border-0 focus-visible:ring-0 p-6 font-mono text-sm leading-relaxed"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </TabsContent>
                        <TabsContent value="preview" className="flex-1 p-6 prose dark:prose-invert max-w-none overflow-auto min-h-[500px]">
                            {content ? (
                                <ReactMarkdown>{content}</ReactMarkdown>
                            ) : (
                                <p className="text-muted-foreground italic">Nothing to preview</p>
                            )}
                        </TabsContent>
                    </Tabs>
                ) : (
                    <Textarea
                        placeholder="Paste your code or text here..."
                        className="min-h-[500px] resize-none border-0 focus-visible:ring-0 p-6 font-mono text-sm leading-relaxed flex-1"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        spellCheck={false}
                    />
                )}
            </Card>

            {successSlug && (
                <SuccessModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    slug={successSlug}
                />
            )}
        </div>
    );
}
