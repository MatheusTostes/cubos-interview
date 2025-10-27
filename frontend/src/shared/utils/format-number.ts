/**
 * Formata números grandes em formato abreviado
 * @param value - Número a ser formatado
 * @returns String formatada (ex: 1.85M, 850K, 1.2K, 500)
 */
export const formatNumber = (value: number): string => {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000
    // Remove zeros desnecessários (ex: 1.00M -> 1M, 1.50M -> 1.5M)
    return `${millions.toFixed(2).replace(/\.?0+$/, '')}M`
  }

  if (value >= 1_000) {
    const thousands = value / 1_000
    // Remove zeros desnecessários (ex: 1.00K -> 1K, 1.50K -> 1.5K)
    return `${thousands.toFixed(2).replace(/\.?0+$/, '')}K`
  }

  return value.toString()
}

/**
 * Formata números grandes em formato abreviado (versão pt-BR com vírgula)
 * @param value - Número a ser formatado
 * @returns String formatada (ex: 1,85M, 850K, 1,2K, 500)
 */
export const formatNumberBR = (value: number): string => {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000
    return `${millions.toFixed(2).replace('.', ',').replace(/,?0+$/, '')}M`
  }

  if (value >= 1_000) {
    const thousands = value / 1_000
    return `${thousands.toFixed(2).replace('.', ',').replace(/,?0+$/, '')}K`
  }

  return value.toString()
}
