export function formatAsMoney(amount: number, currency = true): string {
  try {
    const formattedAmount = new Intl.NumberFormat().format(amount)
    return currency ? `₦${formattedAmount}` : formattedAmount
  } catch (error) {
    console.log(error)
    return currency ? `0.00` : `0`
  }
}
