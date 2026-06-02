interface ScriptureProps {
  text: string;
  reference: string;
  className?: string;
}

const Scripture = ({ text, reference, className = "" }: ScriptureProps) => (
  <blockquote className={`jmj-scripture max-w-2xl mx-auto ${className}`}>
    <p className="text-base md:text-lg leading-relaxed">"{text}"</p>
    <cite>{reference}</cite>
  </blockquote>
);

export default Scripture;
