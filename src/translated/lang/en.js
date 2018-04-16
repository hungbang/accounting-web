export default {
  validate: {
    required: '{text} is required',
    min: 'Min {number} characters',
    number: 'Only enter numeric characters for {text}',
    email: {
      valid: 'E-mail must be valid'
    },
    pass: {
      confirm: 'password do not confirm'
    }
  },
  login: {
    title: 'Login Form',
    email: 'E-Mail',
    password: 'Password',
    password_hint: 'At least 8 characters',
    submit: 'Login',
    create_new_user: 'Create new user',
    forgot_password: 'Forgot password'
  },
  factor_auth: {
    title: 'Sign in to your account',
    subheader: 'You have 2 factor authentication enabled.',
    subheader_one: 'Please Enter Your Google Authenticator Six-Digit Code',
    submit: 'Continue'
  },
  register: {
    title: 'Register Form',
    success: 'Register Successful',
    success_msg: `Please activate your account. We sent you a confirmation email to verify your account. If you don't see the email in your inbox then check the <strong>spam/junk</strong> folders. Sometimes it just takes a little bit more time. Tip: Add our email address
    <a href="mailto:.noreply@drones4hire.com" class="s-signup-success__link">noreply@drones4hire.com</a> to your address book to make sure you receive our emails.`,
    firstname: 'First Name',
    lastname: 'Last Name',
    email: 'E-Mail',
    pass: 'Password',
    pass_confirm: 'Password Confirm',
    submit: 'Register'
  },
  enabled: {
    title: 'Active Account',
    subtitle: 'Please wait in second !',
    msg_success: 'Account is enabled successful'
  },
  accountant: {
    table: {
      title_name: 'Coin name (symbol)',
      title_amount: 'Amount (Coin)',
      title_price: 'Price {type} (USD)',
      title_total: 'Total {type} (USD)',
      title_profit_loss: 'Profit & loss'
    },
    form: {
      label_name: 'Name (Symbol)',
      label_amount: 'Amount'
    },
    details: {
      percent: '{unit} %'
    }
  }
}
