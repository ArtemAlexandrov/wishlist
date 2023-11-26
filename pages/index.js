import Link from 'next/link'
import classNames from 'classnames'
import {useEffect, useRef, useState} from 'react'
import styles from "../styles/_home.module.css"
import Head from 'next/head'
import Image from 'next/image'
import {ExternalIcon} from "../src/icons/external.svg";

const URL = "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clpb9gcjd5srb01t7f29f7pd8/master"
const FAST_URL = "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clpb9gcjd5srb01t7f29f7pd8/master"

const send = async (json, fast = false) => {
  return await fetch(fast ? FAST_URL : URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json)});
}

const toogleBookItem = async (id, state) => {
  const mutation = `mutation ToogleBooked($state: Boolean!, $id: ID!) {
  updateWishlistItem(data: {booked: $state}, where: {id: $id}) {
    id
  }
}`
  try {
    await send({
      query: mutation,
      variables: {
        state, id
      }
    });
  } catch (error) {
    console.error("ERROR TOOGLE", error)
  }
}

const loadItems = async () => {
  const response = await send({query:`{
      wishlistItems {
        id
        title
        description
        linkUrl
        image {
          url
        }
        booked
      }
    }`
    }, true);
  const data = await response.json()

  return data?.data.wishlistItems || [];
}

const WishItem = props => {
  const [booked, setBooked] = useState(props.booked)

  return (
  <div className={"card"}>
    <div className="card-header">
      <div className="card-header-title">
        {props.itemName}
      </div>
    </div>
    <div className="card-image">
      <figure className={classNames("image", styles.wishImage)}>
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
          <button className={classNames("button is-rounded is-fullwidth", {
            "is-primary": !booked,
            "is-danger": booked,
            "is-warning": false
          })}
          onClick={() => {
            setBooked(!booked)
            toogleBookItem(props.id, !booked)
          }}
          >
            Вот это збс!
          </button>
      </div>
    </div>
  </div>
)};

export default function Home() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const run = async () => setItems(await loadItems())
    run()
  }, [])

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
              </div>
            </div>
          </nav>

          <div className={styles.wishCards}>
            {
              items.map(({id, title: itemName, description, linkUrl: url, image: {url: imageUrl}, booked}) => (
                <WishItem key={id} itemName={itemName} src={imageUrl}
                          id={id}
                          booked={booked}
                          description={description} url={url}/>
              ))
            }
          </div>
        </div>
      </div>
  )
}
