const Content = (props: ContentProps) => {
  const parts = props.courseParts
  return (
    <>
    {parts.map((part => (
      <p key={part.name}>{part.name} {part.exerciseCount}</p>
    )))}
    </>
  )
}

export default Content;