import AnimatedElement from '../animatedElement';

interface InfoSectionProps {
  title: string;
  description: string;
  logoSrc?: string;
  altText?: string;
  reverse?: boolean;
}

export default function InfoSection({
  title,
  description,
  logoSrc = './src/assets/logoBW.png',
  altText = 'logo_maua_esports',
  reverse = false,
}: InfoSectionProps) {
  // Direção da animação baseada na posição real dos elementos
  const imageDirection = reverse ? 'right' : 'left';
  const textDirection = reverse ? 'left' : 'right';

  return (
    <div className="flex h-screen w-full bg-white font-['Inter']">
      <div
        className={`flex h-full w-full items-center px-20 ${reverse ? 'flex-row-reverse' : ''}`}
      >
        <div
          className={`flex h-full items-center ${reverse ? 'justify-end pl-12' : 'justify-start pr-12'}`}
        >
          <AnimatedElement direction={imageDirection}>
            <img
              src={logoSrc}
              alt={altText}
              className="h-auto max-h-[75vh] w-auto object-contain"
            />
          </AnimatedElement>
        </div>

        <div
          className={`flex h-full items-center ${reverse ? 'justify-start pr-20' : 'ml-20 justify-start'}`}
        >
          <div className="max-w-2xl">
            <AnimatedElement direction={textDirection}>
              <h1 className="mb-10 text-7xl font-bold tracking-tight text-black uppercase drop-shadow-[2px_2px_4px_#0055ff]">
                {title}
              </h1>
              <p className="text-justify font-[brush-script-mt] text-3xl leading-relaxed text-black">
                {description}
              </p>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </div>
  );
}
