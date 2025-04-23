import { useEffect, useRef, useState } from "react"

// Direções disponíveis: 'left', 'right', 'top', 'bottom'
import { ReactNode } from "react"

interface AnimatedElementProps {
  children: ReactNode
  direction?: "left" | "right" | "top" | "bottom"
  delay?: number
  duration?: number
  className?: string
  onClick?: () => void
}

export default function AnimatedElement({
  children,
  direction = "left",
  delay = 0,
  duration = 800,
  className = "",
  onClick = () => {}
}: AnimatedElementProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  // Mapeia direções para propriedades de transformação
  const getTransformValue = () => {
    if (!isVisible) {
      switch (direction) {
        case "left":
          return "translateX(-100px)"
        case "right":
          return "translateX(100px)"
        case "top":
          return "translateY(-100px)"
        case "bottom":
          return "translateY(100px)"
        default:
          return "translateX(-100px)"
      }
    }
    return "translate(0)"
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: getTransformValue(),
    transition: `opacity ${duration}ms, transform ${duration}ms`,
    transitionDelay: `${delay}ms`
  }

  return (
    <div
      ref={ref}
      style={animationStyle}
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
