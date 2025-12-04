import { useMDXComponents } from 'nextra-theme-docs'
import MermaidCodeBlock from './MermaidCodeBlock'

export function useComponents() {
  const components = useMDXComponents()
  
  return {
    ...components,
    code: (props: any) => {
      const { children, className } = props
      const language = className?.replace('language-', '')
      
      if (language === 'mermaid') {
        return <MermaidCodeBlock>{children}</MermaidCodeBlock>
      }
      
      return <components.code {...props} />
    },
  }
}

