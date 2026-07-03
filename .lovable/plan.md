## Problema
Os dois vídeos embedados do YouTube (hero section e "Quem sou eu?") apresentam volumes perceptivelmente diferentes na página, apesar de terem o mesmo nível de áudio no Premiere Pro. O vídeo da hero (formato normal 16:9) soa mais baixo que o vídeo da seção "Quem sou eu?" (formato Shorts 9:16).

## Diagnóstico
- O YouTube **não oferece parâmetro de URL** para controlar volume em embeds
- O YouTube aplica **normalização de áudio automática** que pode variar entre vídeos normais e Shorts
- O projeto já possui o hook `useYouTubeVolume` que controla volume via postMessage para a API do YouTube

## Solução Proposta
Aplicar o hook `useYouTubeVolume` em ambos os componentes para forçar o mesmo nível de volume (100%, volume máximo/original) via JavaScript, bypassando a normalização automática do YouTube.

### Passos:
1. **Adicionar `enablejsapi=1`** nos parâmetros de URL dos dois iframes do YouTube (Hero.tsx e QuemSou.tsx)
2. **Importar e aplicar o hook `useYouTubeVolume`** em ambos os componentes, com volume = 100
3. **Associar o ref retornado pelo hook** aos elementos `<iframe>` dos vídeos

## Arquivos Alterados
- `src/components/pastor-morelli/Hero.tsx` — adicionar controle de volume ao vídeo da hero
- `src/components/pastor-morelli/QuemSou.tsx` — adicionar controle de volume ao vídeo da seção "Quem sou eu?"

## Resultado Esperado
Ambos os vídeos tocarão no volume máximo disponível (100), equivalente ao volume original do arquivo, eliminando a diferença percebida entre eles.