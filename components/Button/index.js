const Button = React.memo(({ className, disabled, ...rest }) => (
  <button
    className={`f3 ph4 br2 pv3 center db white b block
      ${disabled ? 'bg-light-blue not-allowed' : 'bg-blue dim pointer'}
      ${className}
    `}
    disabled={disabled}
    {...rest}
  />
))

export default Button
