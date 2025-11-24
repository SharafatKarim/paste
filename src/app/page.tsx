import Editor from "@/components/Editor";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Pastebin Clone
        </h1>
        <p className="text-muted-foreground">
          Share code and text with syntax highlighting and custom links.
        </p>
      </div>
      <Editor />
    </div>
  );
}
