import { trackPageView } from "./libs/analytics"
import { isValidEmail, sendEmail } from "./libs/email"
import { charge } from "./libs/payment"
import security from "./libs/security"
import { getShippingQuote } from "./libs/shipping"

// Mocking modules
export function getShippingInfo(destination: string) {
  const quote = getShippingQuote(destination)
  if (!quote) return "Shipping Unavailable"
  return `Shipping Cost: $${quote.cost} (${quote.estimatedDays} Days)`
}

// Interaction testing
export async function renderPage() {
  trackPageView("/home")

  return "<div>content</div>"
}

// Interaction testing
export async function submitOrder(
  order: { totalAmount: number },
  creditCard: { creditCardNumber: string }
) {
  const paymentResult = await charge(creditCard, order.totalAmount)

  if (paymentResult.status === "failed")
    return { success: false, error: "payment_error" }

  return { success: true }
}

// Partial mocking
export async function signUp(email: string) {
  if (!isValidEmail(email)) return false

  await sendEmail(email, "Welcome aboard!")

  return true
}

// Spying on functions
export async function login(email: string) {
  const code = security.generateCode()

  await sendEmail(email, code.toString())
}

// Mocking dates
export function isOnline() {
  const availableHours = [8, 20]
  const [open, close] = availableHours
  const currentHour = new Date().getHours()

  return currentHour >= open && currentHour < close
}

// Mocking dates
export function getDiscount() {
  const today = new Date()
  const isChristmasDay = today.getMonth() === 11 && today.getDate() === 25
  return isChristmasDay ? 0.2 : 0
}
