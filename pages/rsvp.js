import React, { useState } from "react";
import Image from "next/image";
import { google } from "googleapis";
import { Buffer } from "buffer";
import { decode } from 'js-base64';
import { fetchAPI } from "../lib/api";
import Layout from "../components/layout";
import Button from 'react-bootstrap/Button';
import DcRsvp from '../components/dcRsvp';
import AshevilleRsvp from '../components/ashevilleRsvp';
import DcInfo from "../components/dcInfo";
import AshevilleInfo from "../components/ashevilleInfo";
import styles from "../styles/Rsvp.module.css";


function Registry({ guestList, dcInfo, ashInfo }) {

    const [ state, setState ] = useState({
        dc: false,
        asheville: false,
        both: false,
        name: ''
    });

     // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
    
        // Get data from the form.
        const data = {
          first: event.target.first.value,
          last: event.target.last.value,
        };
        
        let guest = `${data.first} ${data.last}`;

        guest = guest.replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,'').replace(/\s/g, '').toLowerCase();

        const checkGuest = guestList.filter((v,i) => {
            return v[0] === guest;
        });

        if (checkGuest.length < 1) {
            alert(`Sorry, we couldn't find the name ${data.first} ${data.last} on our guest list. Please contact Jessie and Bi for any questions you may have.`);


        } else {
            const invitedTo = checkGuest[0][1];

            // Check invited to
            if (invitedTo === 'dc') {
                setState({
                    dc: true,
                    name: guest
                });
            }

            if (invitedTo === 'asheville') {
                setState({
                    asheville: true,
                    name: guest
                });
            }

            if (invitedTo === 'both') {
                setState({
                    both: true,
                    name: guest
                });
            }
        }
    
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)
    
        // API endpoint where we send form data.
        const endpoint = '/api/form'
    
        // Form the request for sending data to the server.
        const options = {
          // The method is POST because we are sending data.
          method: 'POST',
          // Tell the server we're sending JSON.
          headers: {
            'Content-Type': 'application/json',
          },
          // Body of the request is the JSON data we created above.
          body: JSONdata,
        }
    
        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)
    
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
    };

    return (
        <Layout>
            {
                state.name === '' ?
                <div className={`container ${styles.container}`}>
                    <div className={styles.avatars}>
                        <img 
                            src='https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBob&accessoriesType=Blank&hairColor=Blonde&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Red&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light'
                            className={styles.avatarJ}
                        />
                        <Image 
                            src="/wedding-rings.png"
                            width={200}
                            height={200}
                            className={styles.rings}
                        />
                        <img 
                            src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Black&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Tanned'
                            className={styles.avatarB}
                        />
                    </div>
                    <h1 className="h3 mb-3 mt-3 font-weight-normal">To RSVP<br></br>Please enter your name<br></br><span className={styles.soft}>{`(exactly how it is on the email we sent you)`}</span></h1>
                    <div className={`text-center ${styles.formContainer}`}>
                        <form className={styles.formSignin} onSubmit={handleSubmit}>
                            <input type="text" id="first" name="first" className={`form-control ${styles.first}`} placeholder="First name" required autoFocus />
                            <input type="text" id="last" name="last" className={`form-control ${styles.last}`} placeholder="Last name" required />
                            <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">Submit</button>
                        </form>
                    </div>            
                </div>
                :
                <div></div>
            }
            {state.dc ? 
                <div className={`container ${styles.containerRsvp}`}>
                    <div className="row">
                        <div className={`col-lg-6`}>
                            <DcInfo dcInfo={dcInfo}/>
                        </div>
                        <div className={`col-lg-6`}>
                            <DcRsvp guest={state.name}/>
                        </div>
                    </div>
                </div>
                : 
                <div></div>
            }
            {state.asheville ?
                <div className={`container ${styles.containerRsvp}`}>
                    <div className="row">
                        <div className="col-lg-6">
                            <AshevilleInfo ashInfo={ashInfo}/>
                        </div>
                        <div className="col-lg-6">
                            <AshevilleRsvp guest={state.name}/>
                        </div>
                    </div>
                </div>
                :
                <div></div>
            }
            {state.both ?
                <div className={`container ${styles.containerRsvp}`}>
                    <div className="row">
                        <div className="col-lg-6">
                            <AshevilleInfo ashInfo={ashInfo}/>
                        </div>
                        <div className="col-lg-6">
                            <AshevilleRsvp guest={state.name}/>
                        </div>
                        <div className="col-lg-6">
                            <DcInfo dcInfo={dcInfo}/>
                        </div>
                        <div className="col-lg-6">
                            <DcRsvp guest={state.name}/>
                        </div>
                    </div>
                </div>
                :
                <div></div>
            }
        </Layout>
    );
}

export async function getStaticProps() {
    // Get master guest list
    const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const credentials = JSON.parse(
        Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
    );
    console.log(credentials);
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const range = 'A:B';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range
    });

    const guestList = response.data.values;

    const [ dcInfo, ashInfo ] = await Promise.all([
        fetchAPI("/dc-info", {
          populate: "*"
        }),
        fetchAPI("/asheville-info", {
          populate: "*"
        })
    ]);

    return { 
        props: {
            guestList,
            dcInfo,
            ashInfo
        }
    }
};

export default Registry;
