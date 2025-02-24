interface SpacerProps {
  p?: number
  pt?: number
  pb?: number
  pl?: number
  pr?: number
  px?: number
  py?: number
  m?: number
  mt?: number
  mb?: number
  ml?: number
  mr?: number
  mx?: number
  my?: number
  children: React.ReactNode
}

const Spacer = (props: SpacerProps) => {
  const { p, pt, pb, pl, pr, px, py, m, mt, mb, ml, mr, mx, my, children } =
    props

  const style: React.CSSProperties = {
    paddingTop: pt ?? py ?? p ?? 0,
    paddingBottom: pb ?? py ?? p ?? 0,
    paddingLeft: pl ?? px ?? p ?? 0,
    paddingRight: pr ?? px ?? p ?? 0,
    marginTop: mt ?? my ?? m ?? 0,
    marginBottom: mb ?? my ?? m ?? 0,
    marginLeft: ml ?? mx ?? m ?? 0,
    marginRight: mr ?? mx ?? m ?? 0,
  }

  return <div style={style}>{children}</div>
}

export default Spacer
