import Link from 'next/link'
import classNames from 'classnames'
import {useEffect, useRef, useState} from 'react'
import styles from "../styles/_home.module.css"
import useSWR from 'swr'
import Head from 'next/head'
import Image from 'next/image'


const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {

  const [email, setEmail] = useState("");
  const [modalIsActive, toggleModal] = useState(false)

  const { data, error } = useSWR('/api/get_items', fetcher)

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

            {/*items*/}




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
              data?.data.wishItems.map(({id, itemName, description, url, image: {url: imageUrl}}) => (
                <div className={"card"} key={id}>
                  <div className="card-header">
                    <div className="card-header-title">
                      {itemName}
                    </div>
                  </div>
                  <div className="card-image">
                    <figure className="image is-1by1">
                      <Image src={imageUrl}
                           alt="Placeholder image"/>
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="content">
                      {description}
                    </div>
                  </div>
                  <div className="card-footer">
                    {url && (
                      <div className="card-footer-item">
                        <a href={url} target="_blank" rel="noreferrer" className="button is-rounded is-fullwidth">
                          Чо это где это?
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
              ))
            }
          </div>
        </div>
      </div>
  )
}
