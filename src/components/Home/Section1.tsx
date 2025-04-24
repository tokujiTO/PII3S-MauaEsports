import AnimatedElement from "../animatedElement"

export default function Section1() {
  return (
    <div className='flex h-[540px]'>
      <AnimatedElement direction='left' className='h-full w-1/2 bg-red-500'>
        <p>Esse eh o lado esquerdo</p>
      </AnimatedElement>
      <AnimatedElement
        direction='right'
        delay={300}
        className='h-full w-1/2 bg-blue-500'
      >
        <p>Esse eh o lado direito</p>
      </AnimatedElement>
    </div>
  )
}
