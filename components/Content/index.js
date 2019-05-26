const Content = React.memo(({ children }) => (
  <div>
    {children}

    <style jsx>
      {`
        div {
          padding: 2ch;
          margin: auto;
          max-width: 70ch;
        }
      `}
    </style>
  </div>
))

export default Content
