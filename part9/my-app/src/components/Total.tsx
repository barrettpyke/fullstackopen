interface TotalProps {
  courseParts: Array<Part>;
}

interface Part {
  name: string,
  exerciseCount: number
}

const Total = (props: TotalProps) => {
  const parts = props.courseParts;
  return (
  <p>
  Number of exercises{" "}
    {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
  )
}

export default Total;