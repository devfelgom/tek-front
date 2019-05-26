const Field = React.memo(({ className, error, label, name, ...rest }) => (
  <div className={`flex flex-column justify-between ${className}`}>
    <label htmlFor={name} className="f5 b db mb2">
      {label}
    </label>

    <input
      id={name}
      className="br2 bg-animate hover-bg-near-white input-reset ba b--black-20 pa3 f3 db w-100"
      name={name}
      {...rest}
    />

    <p className={`f6 b db mb3 ${error ? 'red' : 'transparent'}`}>
      {error || '_'}
    </p>
  </div>
))

export default Field
