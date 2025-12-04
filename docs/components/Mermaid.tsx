'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    if (ref.current && chart && !isRendered) {
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
      
      mermaid.render(id, chart.trim()).then((result) => {
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
  }, [chart, isRendered])

  return <div ref={ref} className="mermaid flex justify-center" />
}

