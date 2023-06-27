import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import styles from '../styles/Modal.module.css';

function ModalCarousel({ pictureData }) {

    return (
        <Carousel slide={false}>
            {
                pictureData.map(pic => {
                    const picData = pic.attributes.photo.data.attributes;

                    return (
                        <Carousel.Item key={pic.id}>
                            <Image 
                                alt={picData.alternativeText}
                                src={picData.url}
                                width={picData.width}
                                height={picData.height}
                            />
                            <Carousel.Caption>
                                <h2 className={`text-white ${styles.caption}`}>{pic.attributes.description}</h2>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    );

}

export default ModalCarousel;