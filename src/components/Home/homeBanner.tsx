
interface HomeBannerProps {
  title: string;
  imageSrc?: string;
  altText?: string;
}

export default function HomeBanner({
  title,
  imageSrc = "./src/assets/logoBW.png",
  altText = "logo_maua_esports",
}: HomeBannerProps) {
  return (
    <div className="flex h-screen w-full bg-blue-900 font-['Inter']">
      <div className="flex w-full h-full px-20 items-center">
        {/* Imagem à esquerda */}
        <div className="flex h-full items-center justify-start pr-12">
          <img 
            src={imageSrc} 
            alt={altText}
            className="h-auto max-h-[80vh] w-auto object-contain opacity-10" 
          />
        </div>

        {/* Título à direita */}
        <div className="flex h-full items-center justify-start ml-auto">
          <h1 className="text-white text-5xl font-bold uppercase tracking-wide">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}