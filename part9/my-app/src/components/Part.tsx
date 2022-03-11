interface PartProps {
  courseParts: Array<CoursePart>;
}

interface CoursePart {
  type: string;
  name: string;
  exerciseCount: number;
  description: string;
  groupProjectCount: number;
  exerciseSubmissionLink: string;
}

const Part = (props: PartProps) => {
  const parts = props.courseParts
  return (
    <>
    {parts.forEach(part => {
      switch(part.type) {
        case "normal":
          <div>
          <p>{part.name}</p>
          <p>{part.exerciseCount}</p>
          <p>{part.description}</p>
          </div>
          break;
        case "groupProject":
          <div>
          <p>{part.name}</p>
          <p>{part.exerciseCount}</p>
          <p>{part.groupProjectCount}</p>
          </div>
          break;
        case "submission":
          <div>
          <p>{part.name}</p>
          <p>{part.description}</p>
          <p>{part.exerciseCount}</p>
          <p>{part.exerciseSubmissionLink}</p>
          </div>
          break;
      }})}
    </>
  )
}

export default Part;