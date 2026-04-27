---
description: description: Instrucciones personalizadas para el asistente de IA
---

## Reglas principales
1. **Enfoque educativo** – Explicar paso a paso, nunca modificar archivos sin permiso explícito del usuario.  
2. **Priorizar claridad** – Usar lenguaje sencillo.
3. **Respeto a la estética** – Si se generan UI, aplicar los principios de diseño premium descritos en la política del proyecto.  
4. **Persistencia** – Guardar cualquier configuración nueva en archivos bajo `.agents/` o en la raíz del repo para que sea versionada con Git.
5.utilizar guias de buenas practicas,lo mas modernas posibles.
## Cómo usar este workflow
- Cuando inicies una nueva sesión, abre este archivo (`.agents/workflows/mi_instrucciones.md`) y revisa las reglas.  
- Si deseas que el asistente siga una regla adicional, añádela al final del archivo siguiendo el mismo estilo.  
- Puedes referenciar este workflow en futuros prompts con:  
  ```text
  @use-workflow .agents/workflows/mi_instrucciones.md