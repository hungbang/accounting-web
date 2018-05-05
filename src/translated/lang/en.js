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
    success: 'You have been successfully registered',
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
      title_price: '{type} Price (USD)',
      title_total: '{type} Total (USD)',
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
