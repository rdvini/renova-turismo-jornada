interface ScriptureProps {
  text: string;
  ref: string;
  className?: string;
}

const Scripture = ({ text, ref, className = "" }: ScriptureProps) => (
  <blockquote className={`jmj-scripture max-w-2xl mx-auto ${className}`}>
    <p className="text-base md:text-lg leading-relaxed">"{text}"</p>
    <cite>{ref}</cite>
  </blockquote>
);

export default Scripture;
