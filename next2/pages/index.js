import React from 'react'
import Head from 'next/head'
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import sqlite3 from 'sqlite3';

const headerStyle = {
    color:'white',
    position:"absolute",
    zIndex:4,
    top:'30%',
    left:'40%'
}

const contentStyle = {
    color:'white',
    textAlign:"center",
    top:'50%',
    left:'25%',
    position:"absolute",
    zIndex:4
}

const bgImg = {
    position: "fixed",
    zIndex: 3,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
};

function sendEmail(email){
    const body = `Здравствуйте, я нашел вашего питомца.%0A-----------%0AС уважением, ${localStorage.user}`;
    window.open(`mailto:${email}?subject=Потерянный зверь&body=${body}`);
}

function Animal(props){
    if(!props.data) return <p>Loading</p>
    const {header,content,img} = props.data;
    return (
        <div>
            <h1 style={headerStyle}>{header}</h1> <br />
            <h2 style={contentStyle}>{content}</h2>
            <img
                style={bgImg}
                alt="Чара (моя собака)"
                src={img}
            />
        </div>
    );
}

export default function Home({ animals }) {
    React.useEffect(()=>{
        let user = localStorage.getItem('user');
        if (user===null){
            while (user===null){
                user=prompt("Введите ваше имя пользователя");
                if (!user){
                    alert('Обязательно!');
                }
                else {
                    localStorage.setItem('user',user);
                }
            }
        }
    },[]);

    function logout(){
        localStorage.clear();
        location.reload();
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Petto</title>
                <meta name="description" content="Социальная сеть для питомцев" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <main className={styles.main}>
                <button onClick={logout}>logout</button>
                <h1>Petto</h1>
                <AwesomeSlider style={{ "--slider-height-percentage": "100%" }}>
                    {
                        animals.map((data,i)=><div key={i} style={{ zIndex: 2 }} onClick={()=>sendEmail(data?.email)}>
                            <Animal data={data} />
                        </div>)
                    }
                </AwesomeSlider>
                <h1>Communities</h1>
                <Link href="/community">Community</Link>
            </main>

            <footer className={styles.footer}>
                Petto, (c) 2022
            </footer>
        </div>
    )
}

export async function getStaticProps() {
    let db = new sqlite3.Database('./public/next2.db');

    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM animals', (err, rows) => {
            if (err) reject(err);
            else resolve({ props: { animals: rows } });
        });
    });
}