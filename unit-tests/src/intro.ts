export const max = (a: number, b: number) => (a > b ? a : b)

export const fizzBuzz = (n: number) => {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz"
  if (n % 3 === 0) return "Fizz"
  if (n % 5 === 0) return "Buzz"
  return n.toString()
}

export const factorial = (n: number): number | undefined => {
  if (n === 0) return 1
  else if (n < 0) return undefined

  return n * (factorial(n - 1) || 1)
}
