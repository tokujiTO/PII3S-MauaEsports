import AnimatedElement from "../animatedElement"

interface InfoSectionProps {
  title: string
  description: string
  logoSrc?: string
  altText?: string
}
export default function InfoSection({
  title,
  description,
  logoSrc = "./src/assets/logoBW.png",
  altText = "logo_maua_esports",
}: InfoSectionProps
) {
  return (
    <div className="flex h-screen w-full items-center bg-white px-8 font-['Inter']"> {/* Fonte Inter como padrão */}
      {/* Imagem */}
      <div className="flex h-full w-1/4 items-center p-4">
        <AnimatedElement>
          <img 
            src={logoSrc} 
            alt={altText}
            className="h-auto max-h-[40vh] w-full object-contain" 
          />
        </AnimatedElement>
      </div>

      {/* Conteúdo */}
      <div className="flex w-3/4 flex-col p-6">
        {/* Título com fonte sans-serif moderna */}
        <AnimatedElement delay={0.2}>
          <h1 className="mb-6 text-4xl font-bold uppercase tracking-tight text-black drop-shadow-[0_2px_4px_rgba(0,100,255,0.3)] md:text-5xl font-['Inter']">
            {title}
          </h1>
        </AnimatedElement>

        {/* Parágrafo */}
        <AnimatedElement delay={0.4}>
          <div className="max-w-4xl">
            <p className="text-justify text-lg uppercase leading-tight tracking-wide text-black font-['Inter']">
              {description.split(' ').map((word, i) => (
                <span key={i} className="mr-1 inline-block">{word}</span>
              ))}
            </p>
          </div>
        </AnimatedElement>
      </div>
    </div>
  );
}