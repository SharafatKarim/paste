export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">1. Data Collection</h2>
                <p>
                    We collect the content you paste (text/code) and the metadata associated with it (language, creation time).
                    We also track the number of views for each paste.
                </p>
            </section>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">2. Public Nature of Data</h2>
                <p>
                    <strong>Important:</strong> All pastes created on this platform are public. Anyone with the link can view them.
                    Please do not paste sensitive information such as passwords, API keys, or personal data.
                </p>
            </section>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">3. Data Retention</h2>
                <p>
                    We currently do not have an automatic expiration policy. Pastes are stored indefinitely unless manually removed by the administrator.
                </p>
            </section>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">4. Contact</h2>
                <p>
                    If you have any questions or need a paste removed, please contact us at <a href="mailto:sharafat@duck.com" className="underline">sharafat@duck.com</a>.
                </p>
            </section>
        </div>
    );
}
