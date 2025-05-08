import AnimatedElement from "../animatedElement"

interface InfoSectionProps {
  title: string
  description: string
  logoSrc?: string
  altText?: string
  reverse?: boolean
}

export default function InfoSection({
  title,
  description,
  logoSrc = "./src/assets/logoBW.png",
  altText = "logo_maua_esports",
  reverse = false,
}: InfoSectionProps) {
  return (
    <div className="flex h-screen w-full bg-white font-['Inter']">
      <div className={`flex w-full h-full px-20 ${reverse ? 'flex-row-reverse' : ''}`}>
        
        {/* Imagem */}
        <div className="flex h-full items-center justify-start pr-12">
          <AnimatedElement>
            <img 
              src={logoSrc} 
              alt={altText}
              className="h-auto max-h-[75vh] w-auto object-contain" 
            />
          </AnimatedElement>
        </div>

        {/* Texto */}
        <div className="flex h-full items-center justify-start ml-35">
          <div className="max-w-2xl mr-12">
            <AnimatedElement delay={0.2}>
              <h1 className="mb-10 text-7xl font-bold uppercase tracking-tight text-black drop-shadow-[0_4px_8px_rgba(0,80,255,0.8)]">
                {title}
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={0.4}>
              <p className="text-justify text-3xl leading-relaxed text-black font-[brush-script-mt]">
                {description}
              </p>
            </AnimatedElement>
          </div>
        </div>

      </div>
    </div>
  );
}
