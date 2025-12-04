'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidCodeBlockProps {
  children: string
}

export default function MermaidCodeBlock({ children }: MermaidCodeBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    if (ref.current && children && !isRendered) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
        },
      })
      
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
      const code = children.trim()
      
      mermaid.render(id, code).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg
          setIsRendered(true)
        }
      }).catch((error) => {
        console.error('Mermaid rendering error:', error)
        if (ref.current) {
          ref.current.innerHTML = `<pre>Error rendering diagram: ${error.message}</pre>`
        }
      })
    }
  }, [children, isRendered])

  return <div ref={ref} className="mermaid my-8 flex justify-center" />
}

