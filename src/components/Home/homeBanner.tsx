interface HomeBannerProps {
  title?: string;
  logoSrc?: string;
  altText?: string;
}

export default function HomeBanner({
  title,
  logoSrc = "./src/assets/logoBW.png",
  altText = "logo_maua_esports",
}: HomeBannerProps) {
  return (
    <div className="relative h-[87vh] w-screen bg-blue-900 overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={logoSrc} 
          alt={altText}
          className="h-[100vh] w-auto object-contain opacity-10"
          style={{ 
            maxWidth: '85%',
            pointerEvents: 'none'
          }}
        />
      </div>

      <div className="relative h-full flex items-center justify-center">
      <h1 className="mb-10 text-7xl font-bold uppercase tracking-tight text-white font-sans">          
        {title}
        </h1>
      </div>
    </div>
  );
}