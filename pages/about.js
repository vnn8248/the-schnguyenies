import React from 'react';
import { fetchAPI } from "../lib/api";
import Layout from '../components/layout';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import Message from '../components/message';
import styles from '../styles/About.module.css';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

const About = ({ about }) => {
    console.log(about);
    const storyPhotos = about.attributes.Photos;
    const storyBlocks = about.attributes.story;

    return (
        <Layout>
            <Message context={storyBlocks}/>
            
            <div className={`container ${styles.container}`}>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={styles.myMasonryGrid}
                    columnClassName={styles.myMasonryGridColumn}
                >
                    {
                        storyPhotos.map(item => {
                            const year = item.year;
                            const description = item.description;
                            const image = item.photo;

                            // Cards with images, year, and description
                            if (image) {
                                let imageDetails;
        
                                if (image && year && description) {
                                    imageDetails = image.data.attributes;
        
                                    return (
                                        <div key={item.id} className="">
                                            <div className={`${styles.card} card`}>
                                                <Image 
                                                    src={imageDetails.url}
                                                    width={imageDetails.width}
                                                    height={imageDetails.height}
                                                    alt={imageDetails.alternativeText}
                                                    priority
                                                    className={styles.img}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{year}</h5>
                                                    <p className="card-text">{description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                // Cards with only images and description
                                if (image && !year && description) {
                                    imageDetails = image.attributes;
        
                                    return (
                                        <div key={item.id} className="">
                                            <div className={`${styles.card} card`}>
                                                <Image 
                                                    src={imageDetails.url}
                                                    width={imageDetails.width}
                                                    height={imageDetails.height}
                                                    alt={imageDetails.alternativeText}
                                                    priority
                                                    className={`${styles.img} ${styles.rounded}`}
                                                />
                                                <div className="card-body">
                                                    <p className="card-text">{description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                // Cards with only images and year
                                if (image && year && !description) {
                                    imageDetails = image.attributes;
        
                                    return (
                                        <div key={item.id} className="">
                                            <div className={`${styles.card} card`}>
                                                <Image 
                                                    src={imageDetails.url}
                                                    width={imageDetails.width}
                                                    height={imageDetails.height}
                                                    alt={imageDetails.alternativeText}
                                                    priority
                                                    className={`${styles.img} ${styles.roundedBottom}`}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{year}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            };
                        })
                    }
                </Masonry>
            </div>
        </Layout>
    )
};

export async function getStaticProps() {
    const [ aboutRes ] = await Promise.all([
        fetchAPI("/about", {
            populate: {
                story: { populate: "*" },
                Photos: { populate: "*" }
            },
        })
    ]);
  
    return {
      props: {
        about: aboutRes.data,
      },
      revalidate: 1,
    };
  }

export default About;