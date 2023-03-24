import React from "react";
import Image from "next/image";
import { fetchAPI } from "../lib/api";
import Seo from "../components/seo";
import Layout from "../components/layout";
import Message from "../components/message";
import Countdown from "../components/countdown";
import Timeline from "../components/timeline";
import styles from "../styles/Home.module.css";

const Home = ({ homepage, pastEventPhotos }) => {  
  const marriageDate = new Date("March 12, 2023").getTime();
  const ashevilleDate = new Date("June 24, 2023").getTime();
  const dcDate = new Date("September 30, 2023").getTime();
  
  return (
    <Layout >
      <Seo seo={homepage.attributes.seo} />
      <div className={`container ${styles.hero}`}>
        {/* <Image 
          src={homepage.attributes.hero.data.attributes.url} 
          alt="Jessie and Bi are married at White Sands National Park" 
          width={homepage.attributes.hero.data.attributes.width}
          height={homepage.attributes.hero.data.attributes.height} 
          priority
          className="big"
        /> */}
        <Image 
          src={process.env.HERO_IMG}
          alt='Jessie and Bi are married at White Sands National Park'
          width={6567}
          height={4378}
          priority
        />
      </div>
      <Message context={homepage.attributes.message}/>
      <Countdown targetDate={ashevilleDate}/>
      <Timeline events={homepage.attributes.timeline} pastEventPhotos={pastEventPhotos}/>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [ homepageRes, pastEventPhotos ] = await Promise.all([
    fetchAPI("/homepage", {
      populate: {
        seo: { populate: "*" },
        message: { populate: "*" },
        timeline: { populate: "*" },
        hero: { populate: "*" }
      },
    }),
    fetchAPI("/past-events", {
      populate: "*"
    })
  ]);

  return {
    props: {
      homepage: homepageRes.data,
      pastEventPhotos: pastEventPhotos.data
    },
    revalidate: 1,
  };
}

export default Home;