import { useMDXComponents as useBaseComponents } from 'nextra-theme-docs'
import MermaidCodeBlock from './components/MermaidCodeBlock'

export function useMDXComponents(components: any) {
  const baseComponents = useBaseComponents(components)
  
  return {
    ...baseComponents,
    code: (props: any) => {
      const { children, className = '', ...rest } = props
      const language = className.replace('language-', '')
      
      if (language === 'mermaid') {
        return <MermaidCodeBlock>{String(children).replace(/\n$/, '')}</MermaidCodeBlock>
      }
      
      return <baseComponents.code {...rest} className={className}>{children}</baseComponents.code>
    },
  }
}

