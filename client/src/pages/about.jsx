import { Html } from "@react-three/drei";

const About = (props) => {
  return (
    <Html style={{width: "50vw", height: "auto", transform: "translate(calc(-25vw), -50%)"}}>
      <div className="about-page-container">
        <h1>About</h1>
        <br/><br/>
        <div>
          Lunar Resource Catalog is an Online Catalog of the Lunar Mineral and Ores that are available. This shows a 3d representation of the moon along with the resources available at the particular region and their densities. Thereby, making it ideal for planning future missions to the moon to optimize the resource utilization on the mission. It also facilitates In-Situ resource utilization, reducing the total mass that needs to be launched from Earth. Mining on the Moon is ideal as it has very little gravity and there are no repercussions to damaging the environment ( at least initially ). The little gravity that the Moon has makes it easier for construction of Megastructures in space. Colonization of space is a massive task and the resource costs are astronomical if all the resources are to be launched from Earth. Using the data that is provided and optimizing the plans for mining based on the data, companies would be able to quickly make structures that will accelerate the colonization of space. The Moon can also act as a Randevu point for travelers that want to go beyond the vicinity of the Earth. Having sufficient resources will make this a tourist spot as well.
        </div>
      </div>
    </Html>
  )
}

export default About;