"use client";

import { Paste } from "@/lib/firestore-utils";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Eye, FileCode } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    CodeBlock,
    CodeBlockBody,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockFilename,
    CodeBlockFiles,
    CodeBlockHeader,
    CodeBlockItem,
    CodeBlockSelect,
    CodeBlockSelectContent,
    CodeBlockSelectItem,
    CodeBlockSelectTrigger,
    CodeBlockSelectValue,
    type BundledLanguage,
} from "@/components/ui/shadcn-io/code-block";

interface PasteViewerProps {
    paste: Paste;
}

export default function PasteViewer({ paste }: PasteViewerProps) {
    const formatDate = (timestamp: any) => {
        if (!timestamp) return "";
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);
    };

    const codeData = [
        {
            language: paste.language,
            filename: paste.slug,
            code: paste.content,
        },
    ];

    const renderCodeBlock = () => (
        <CodeBlock data={codeData} defaultValue={codeData[0].language}>
            <CodeBlockHeader>
                <CodeBlockFiles>
                    {(item) => (
                        <CodeBlockFilename key={item.language} value={item.language}>
                            {item.filename}
                        </CodeBlockFilename>
                    )}
                </CodeBlockFiles>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground uppercase">{paste.language}</span>
                    <CodeBlockCopyButton />
                </div>
            </CodeBlockHeader>
            <CodeBlockBody>
                {(item) => (
                    <CodeBlockItem key={item.language} value={item.language}>
                        <CodeBlockContent language={item.language as BundledLanguage}>
                            {item.code}
                        </CodeBlockContent>
                    </CodeBlockItem>
                )}
            </CodeBlockBody>
        </CodeBlock>
    );

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <FileCode className="h-6 w-6" />
                        {paste.slug}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(paste.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {paste.views} views
                        </span>
                    </div>
                </div>
            </div>

            <Card className="overflow-hidden border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                    {paste.language === "markdown" ? (
                        <Tabs defaultValue="preview" className="w-full">
                            <div className="flex items-center justify-between mb-4">
                                <TabsList>
                                    <TabsTrigger value="preview">Preview</TabsTrigger>
                                    <TabsTrigger value="source">Source</TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent value="preview" className="mt-0">
                                <div className="p-6 prose dark:prose-invert max-w-none bg-card rounded-lg border min-h-[200px]">
                                    <ReactMarkdown>{paste.content}</ReactMarkdown>
                                </div>
                            </TabsContent>
                            <TabsContent value="source" className="mt-0">
                                {renderCodeBlock()}
                            </TabsContent>
                        </Tabs>
                    ) : (
                        renderCodeBlock()
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
