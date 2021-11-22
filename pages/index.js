import Link from 'next/link'
import classNames from 'classnames'
import {useEffect, useRef, useState} from 'react'
import styles from "../styles/_home.module.css"
import useSWR from 'swr'
import Head from 'next/head'
import Image from 'next/image'
import {ExternalIcon} from "../src/icons/external.svg";


const fetcher = (url) => fetch(url).then((res) => res.json())

const WishItem = props => (
  <div className={"card"}>
    <div className="card-header">
      <div className="card-header-title">
        {props.itemName}
      </div>
    </div>
    <div className="card-image">
      <figure className="image is-1by1">
        <Image src={props.src}
               layout="fill"
               alt="Placeholder image"/>
      </figure>
    </div>
    <div className="card-content">
      <div className="content">
        {props.description}
      </div>
    </div>
    <div className="card-footer">
      {props.url && (
        <div className="card-footer-item">
          <a href={props.url} target="_blank" rel="noreferrer"
             className="button is-rounded is-fullwidth">
            Чо это где это?
            <span className="icon is-small" style={{paddingLeft: 10}}>
              <ExternalIcon />
            </span>
          </a>
        </div>
      )}
      <div className="card-footer-item">
        <button className="button is-primary is-rounded is-fullwidth">
          Вот это збс!
        </button>
      </div>
    </div>
  </div>
);

export default function Home({items}) {

  const [email, setEmail] = useState("");
  const [modalIsActive, toggleModal] = useState(false)


  const emailInputRef = useRef();

  useEffect(() => {
    const cachedEmail = global.localStorage?.getItem('email')
    if (cachedEmail) {
      setEmail(cachedEmail)
    }
  }, [])
  useEffect(() => {
    global.localStorage.setItem('email', email)
  }, [email])
  useEffect(() => {
    if (modalIsActive) {
      emailInputRef.current.focus()
    }
  }, [modalIsActive])

  return (
      <div>
        <Head>
          <title>AAA With List</title>
        </Head>
        <div className="container">
          <nav className="navbar" role="navigation"
               aria-label="main navigation">
            <div className="navbar-brand">
              <Link href='/'>
                <a className="navbar-item" >
                  AAA Wish List
                </a>
              </Link>
            </div>
            <div className="navbar-menu">
              <div className="navbar-start">
                <Link href='/'>
                  <a className="navbar-item">
                    Wish List
                  </a>
                </Link>
                <a className="navbar-item" onClick={() => toggleModal(true)}>
                  { email ? email : "Who Am I?" }
                </a>
              </div>
            </div>

            <div className={classNames(
              "modal", {
                "is-active": modalIsActive
              }
            )
              }>
              <div
             className="modal-background" onClick={() => toggleModal(false)}/>
              <div className="modal-content">
                <input className="input" type="email"
                       ref={emailInputRef}
                       value={email}
                       onKeyUp={event => {
                         if (event.keyCode === 13) {
                           toggleModal(false)
                         }
                       }}
                       onChange={event => setEmail(event.target.value)}
                       placeholder="Your email"/>
                </div>
              <button className="modal-close is-large"
                      onClick={() => toggleModal(false)}
                      aria-label="close"/>
            </div>
          </nav>

          <div className={styles.wishCards}>
            {
              items.map(({id, itemName, description, url, image: {url: imageUrl}}) => (
                <WishItem key={id} itemName={itemName} src={imageUrl}
                          description={description} url={url}/>
              ))
            }
          </div>
        </div>
      </div>
  )
}

export async function getServerSideProps({ preview = false }) {

  const response = await fetch("https://api-eu-central-1.graphcms.com/v2/ckwax1zmh2wb401z2gz0pfxhh/master", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query:`{
  wishItems {
    id
    itemName
    description
    url
    image {
      url
    }
  } 
}`
    })});
  const data = await response.json()

  return {
    props: { items: data?.data.wishItems || [] },
  }
}