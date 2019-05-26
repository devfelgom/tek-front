import BalloonPosition from 'constants/balloonPosition'

const ProjectHealth = ({ color, description }) => (
  <div
    className={`h2 w2 ba b--light-gray ${color} br-100 tec`}
    data-balloon={`Project health is ${description}`}
    data-balloon-pos={BalloonPosition.UP}
  />
)

export default ProjectHealth
