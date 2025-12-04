import React from 'react'
import { useMDXComponents as useBaseComponents } from 'nextra-theme-docs'
import MermaidCodeBlock from './MermaidCodeBlock'

export function useComponents() {
  const baseComponents = useBaseComponents()
  
  return {
    ...baseComponents,
    code: (props: any) => {
      const { children, className = '', ...rest } = props
      const language = className.replace('language-', '')
      
      if (language === 'mermaid') {
        return <MermaidCodeBlock>{String(children).replace(/\n$/, '')}</MermaidCodeBlock>
      }
      
      const CodeComponent = baseComponents.code as React.ComponentType<any>
      return <CodeComponent {...rest} className={className}>{children}</CodeComponent>
    },
  }
}

