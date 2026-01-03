export default function EndCard() {
  return (
    <div className="my-4 border shadow-sm p-4 rounded-2xl bg-card">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
        You reached the end! ✨
      </h2>
      <div className="mb-4 text-sm text-secondary-foreground prose prose-sm max-w-none">
        I know, I'm sad too. But if you can think of any other good/bad example worth showing the world,
        don't hesitate to submit an issue on GitHub!
        <br />
        <br />
        And if you haven't yet read the accompanying blog post, there is no time like the present. 🙃
      </div>
    </div>
  );
}
