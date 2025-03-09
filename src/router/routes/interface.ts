interface RouteInterface {
  name: string
  path: string
  title?: string
}

export interface RouteLayout {
  login: RouteInterface
  home: RouteInterface
  wallet: RouteInterface
  profile: RouteInterface
  groceries: RouteInterface
  products: RouteInterface
  new_pin: RouteInterface
  reset_pin: RouteInterface
  change_number: RouteInterface
  change_pin: RouteInterface
  payment_history: RouteInterface
  returning_user: RouteInterface
  account_verification: RouteInterface
}
