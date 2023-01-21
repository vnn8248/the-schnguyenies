import React from 'react';
import { fetchAPI } from "../lib/api";
import Layout from '../components/layout';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import Message from '../components/message';
import styles from '../styles/About.module.css';

const breakpointColumnsObj = {
    default: 5,
    1300: 4,
    1100: 3,
    700: 2,
    500: 1
};

const About = ({ about }) => {
    const storyPhotos = about.attributes.Photos;
    const storyBlocks = about.attributes.story;

    return (
        <Layout>
            <div className={`container-fluid ${styles.containerMessage}`}>
                <Message context={storyBlocks} />
            </div>
            
            <div className={`container-fluid ${styles.container}`}>
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
                            const location = item.location;

                            // Cards with images, year, and description
                            if (image) {
                                const imageDetails = image.data.attributes;
        
                                if (image && year && description) {
        
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
                                                    <h5 className="card-title">{`${year} - ${location}`}</h5>
                                                    <p className="card-text">{description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                // Cards with only images and description
                                if (image && !year && description) {
        
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

                                // Cards with only images
                                if (image && !year && !description) {
        
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